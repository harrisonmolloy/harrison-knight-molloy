"use client";

import { useState, useEffect } from "react";

import ForceGraph2D from "react-force-graph-2d";

import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { TAGS_QUERY } from "@/sanity/lib/queries";

export default function Graph2d() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <ForceGraph2D
      graphData={data}
      nodeAutoColorBy="group"
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.2,
        ); // some padding

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions,
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions &&
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions,
          );
      }}
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
    addNode(post._id, "@" + post.title);
    post.tags?.forEach((tag) => {
      addNode(tag._id, "#" + tag.title);
      links.push({ source: post._id, target: tag._id });
    });
  });

  // Process tags and their related tags
  tags.forEach((tag) => {
    addNode(tag._id, "#" + tag.title);
    tag.tags?.forEach((metaTag) => {
      addNode(metaTag._id, "#" + metaTag.title);
      links.push({ source: tag._id, target: metaTag._id });
    });
  });

  console.log({ nodes, links });

  setFunc({ nodes, links });
}
