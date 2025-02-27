"use client";

import { useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";

import { client } from "@sanity/client";
import { POSTS_QUERY } from "@/app/lib/sanity/queries";
import { TAGS_QUERY } from "@/app/lib/sanity/queries";
import {
  POSTS_QUERYResult,
  TAGS_QUERYResult,
} from "@/app/lib/sanity/sanity.types";

export default function Graph3d() {
  const [data, setData] = useState<{
    nodes: { id: string; name: string }[];
    links: { source: string; target: string }[];
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const tags: TAGS_QUERYResult = await client.fetch(TAGS_QUERY);
      const posts: POSTS_QUERYResult = await client.fetch(POSTS_QUERY);

      const nodes: { id: string; name: string }[] = [];
      const nodeIds = new Set();
      const links: { source: string; target: string }[] = [];

      // Helper to add unique nodes
      const addNode = (id: string, name: string) => {
        if (!nodeIds.has(id)) {
          nodeIds.add(id);
          nodes.push({ id, name });
        }
      };

      // Process posts and their tags
      posts.forEach((post) => {
        addNode(post._id, "@" + post.title);
        const postTags = post.tags;
        if (postTags) {
          postTags.forEach((tag) => {
            addNode(tag._id, "#" + tag.title);
            links.push({ source: post._id, target: tag._id });
          });
        }
      });

      // Process tags and their related tags
      tags.forEach((tag) => {
        addNode(tag._id, "#" + tag.title);
        if (tag.tags) {
          tag.tags.forEach((metaTag) => {
            addNode(metaTag._id, "#" + metaTag.title);
            links.push({ source: tag._id, target: metaTag._id });
          });
        }
      });

      const data = { nodes, links };
      console.log(data);

      setData(data);
    }
    fetchData();
  }, []);

  if (!data) return <></>;

  return (
    <ForceGraph3D
      graphData={data}
      nodeThreeObject={(node: { name: string | undefined }) => {
        const sprite = new SpriteText(node.name);
        sprite.color = "rgb(255, 255, 255)";
        sprite.textHeight = 4;
        return sprite;
      }}
      showNavInfo={false}
    />
  );
}
