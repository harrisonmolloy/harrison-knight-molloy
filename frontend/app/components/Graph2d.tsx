"use client";

import dynamic from "next/dynamic";
import { GraphData } from "lib/graphDataTypes";

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export function Graph2d({ graphData }: { graphData: GraphData }) {
  return (
    <ForceGraph2D
      graphData={graphData}
      nodeAutoColorBy="type"
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (node.x && node.y) {
          const fontSize = 12 / globalScale;
          const textWidth = ctx.measureText(node.name || "").width;
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
          ctx.fillText(node.name || "", node.x, node.y);

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
