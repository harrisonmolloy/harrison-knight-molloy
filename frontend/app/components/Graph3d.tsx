"use client";

import { useState, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext";

import { fetchGraphData } from "lib/fetchGraphData";

export default function Graph3d() {
  const [data, setData] = useState<{
    nodes: { id: string; name: string }[];
    links: { source: string; target: string }[];
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchGraphData();
      setData(data);
    }
    fetchData();
  }, []);

  if (!data) return <></>;

  return (
    <ForceGraph3D
      graphData={data}
      nodeAutoColorBy="type"
      nodeThreeObject={(node: { name: string | undefined; type: string }) => {
        const sprite = new SpriteText(node.name);
        sprite.color =
          node.type === "post" ? "rgb(10,10,10)" : "rgb(100,100,150)";
        sprite.textHeight = 4;
        return sprite;
      }}
      linkColor="rgb(0,0,0)"
      linkOpacity={0.6}
      backgroundColor="rgba(0,0,0,0)"
      showNavInfo={false}
    />
  );
}
