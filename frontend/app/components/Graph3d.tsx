"use client";

import dynamic from "next/dynamic";

import { GraphData } from "lib/graphDataTypes";
import SpriteText from "three-spritetext";

const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
});

export function Graph3d({ graphData }: { graphData: GraphData }) {
  return (
    <ForceGraph3D
      graphData={graphData}
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
