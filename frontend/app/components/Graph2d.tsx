"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { GraphData, Node } from "lib/graphDataTypes";

// Hold off rendering component until window is defined.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

export function Graph2d({ graphData }: { graphData: GraphData }) {
  const [size, setSize] = useState({ width: 400, height: 500 });
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  function handleResize() {
    if (
      ref.current &&
      (ref.current.clientWidth !== size.width ||
        ref.current.clientHeight !== size.height)
    ) {
      setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    }
  }

  const handleClick = useCallback(
    (node: Node) => {
      if (node.slug) {
        router.push("/posts/" + node.slug);
      }
    },
    [router],
  );

  useEffect(() => {
    if (!ref.current) return;
    handleResize(); // set initial size
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  });

  return (
    <div ref={ref} className="flex-1">
      <div className="absolute">
        <ForceGraph2D
          graphData={graphData}
          width={size.width}
          height={size.height}
          backgroundColor="oklch(0 0 0 0)"
          linkColor={() => "oklch(.985 .001 106.423)"}
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

              ctx.font = "0.5rem SFMono-Regular";
              ctx.fillStyle = "oklch(.985 .001 106.423)";
              if (node.type == "tag") {
                ctx.fillStyle = "oklch(0.709 0.01 56.259)";
              }

              ctx.fillRect(
                bgPosition.x,
                bgPosition.y,
                bgDimensions.width,
                bgDimensions.height,
              );
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "oklch(.147 .004 49.25)";
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
          onNodeClick={handleClick}
        />
      </div>
    </div>
  );
}
