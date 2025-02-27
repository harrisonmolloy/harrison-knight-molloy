"use client";

import { useState, useEffect } from "react";
import { client } from "@sanity/client";
import { POSTS_QUERY, TAGS_QUERY } from "@/app/lib/sanity/queries";
import ForceGraph2D from "react-force-graph-2d";
import {
  POSTS_QUERYResult,
  TAGS_QUERYResult,
} from "@/app/lib/sanity/sanity.types";

export default function Graph2d() {
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
    <ForceGraph2D
      graphData={data}
      nodeAutoColorBy="group"
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (node.x && node.y) {
          const fontSize = 12 / globalScale;
          const textWidth = ctx.measureText(node.name).width;
          const paddingMultiplier = 0.4;
          const bgDimensions = {
            width: textWidth + fontSize * paddingMultiplier,
            height: fontSize + fontSize * paddingMultiplier,
          };
          const bgPosition = {
            x: node.x - bgDimensions.width / 2,
            y: node.y - bgDimensions.height / 2,
          };

          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = "rgba(10, 10, 10, 0.8)";
          ctx.fillRect(
            bgPosition.x,
            bgPosition.y,
            bgDimensions.width,
            bgDimensions.height,
          );
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = node.color;
          ctx.fillText(node.name, node.x, node.y);

          // to re-use in nodePointerAreaPaint
          node.__bgDimensions = bgDimensions;
          node.__bgPosition = bgPosition;
        }
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        if (node.x && node.y) {
          const bgPosition = node.__bgPosition;
          const bgDimensions = node.__bgDimensions;

          ctx.fillStyle = color;
          ctx.fillRect(
            bgPosition.x,
            bgPosition.y,
            bgDimensions.width,
            bgDimensions.height,
          );
        }
      }}
    />
  );
}
