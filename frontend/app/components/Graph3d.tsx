"use client";

import { useState, useEffect } from "react";

import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import { useRef } from "react";

import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { TAGS_QUERY } from "@/sanity/lib/queries";

export default function Graph3d() {
  const fgRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <ForceGraph3D
      ref={fgRef}
      graphData={data}
      nodeAutoColorBy="group"
      nodeThreeObject={(node) => {
        const sprite = new SpriteText(node.name);
        sprite.color = "rgb(10, 10, 10)";
        sprite.textHeight = 4;
        return sprite;
      }}
      backgroundColor="rgb(255,255,255)"
      linkColor="rgb(10,10,10)"
      linkOpacity={1}
      cooldownTicks={30}
      onEngineStop={() => {
        fgRef.current.zoomToFit(200);
        console.log(data);
      }}
      showNavInfo={false}
    />
  );
}

async function fetchData(setFunc) {
  const posts = await client.fetch(TAGS_QUERY);
  const tags = await client.fetch(POSTS_QUERY);

  const nodes = [];
  const nodeIds = {}; // Simple lookup to track existing nodes
  const links = [];

  // Helper to add unique nodes
  const addNode = (id, name) => {
    if (!nodeIds[id]) {
      nodeIds[id] = true;
      nodes.push({ id, name });
    }
  };

  // Process posts and their tags
  posts.forEach((post) => {
    addNode(post._id, post.title);
    post.tags?.forEach((tag) => {
      addNode(tag._id, tag.title);
      links.push({ source: post._id, target: tag._id });
    });
  });

  // Process tags and their related tags
  tags.forEach((tag) => {
    addNode(tag._id, tag.title);
    tag.tags?.forEach((metaTag) => {
      addNode(metaTag._id, metaTag.title);
      links.push({ source: tag._id, target: metaTag._id });
    });
  });

  setFunc({ nodes, links });
}
