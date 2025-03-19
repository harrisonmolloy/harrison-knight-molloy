"use client";

import { useEffect, useRef, useState, useCallback } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { NodeObject } from "react-force-graph-2d";

import { GraphData } from "types/graphDataTypes";

// Hold off rendering component until window is defined.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type Graph2dPropTypes = { 
  graphData: GraphData;
  isOpen: boolean;
  inline: boolean;
}

export function Graph2d({ graphData, isOpen, inline}: Graph2dPropTypes) {
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
    (node: NodeObject) => {
      if (node.slug) {
        router.push("/posts/" + node.slug);
      }
    },
    [router],
  );

  function getColorVar(str: string) {
    // console.log("getting col", getComputedStyle(document.body));
    return getComputedStyle(document.body).getPropertyValue(str);
  }

  function getMediaMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function drawNode(node: NodeObject, ctx: CanvasRenderingContext2D) {
    if (node.x && node.y) {
      let text = node.name.toUpperCase();
      if (node.type == "tag") {
        text = "#" + text;
      }
      const fontSize = 5;
      const pos = { x: node.x + 3, y: node.y - 3.5 };
      const textWidth = ctx.measureText(text || "").width;
      const mode = getMediaMode();

      // Draw Node Circles
      ctx.fillStyle = getColorVar(`--color-${mode}-fg`);

      if (node.type == "tag") {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, 2 * Math.PI);
        ctx.fill();
      } else if (node.type == "post") {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw Text Boxes
      // ctx.fillStyle = "oklch(.3 .004 49.25)";
      // ctx.fillRect(pos.x, pos.y, textWidth, fontSize + 2);

      // Draw Text
      ctx.fillStyle = getColorVar(`--color-${mode}-fg`);
      if (node.type == "tag") {
        ctx.fillStyle = getColorVar(`--color-${mode}-bright-magenta`);
      }
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Sans Serif`;
      ctx.textBaseline = "top";
      ctx.fillText(text || "", pos.x, pos.y);

      // to re-use in nodePointerAreaPaint
      node.__fontSize = fontSize;
      node.__textWidth = textWidth;
      node.__pos = pos;
    }
  }

  function drawPointerArea(
    node: NodeObject,
    color: string,
    ctx: CanvasRenderingContext2D,
  ) {
    if (node.x && node.y) {
      ctx.fillStyle = color;
      ctx.fillRect(
        node.__pos.x,
        node.__pos.y,
        node.__textWidth,
        node.__fontSize + 2,
      );
    }
  }

  function drawLinkColor() {
    const mode = getMediaMode();
    return getColorVar(`--color-${mode}-fg`);
  }

  useEffect(() => {
    if (!ref.current) return;
    handleResize(); // set initial size
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  });

  return (
    <div ref={ref} className={`${inline && "mt-1 h-[60svh] border-y"} ${isOpen || "h-0 w-0 overflow-hidden"}` }>
      <ForceGraph2D
        graphData={graphData}
        width={size.width}
        height={size.height}
        backgroundColor="oklch(0 0 0 0)"
        linkColor={drawLinkColor}
        nodeCanvasObject={drawNode}
        nodePointerAreaPaint={drawPointerArea}
        onNodeClick={handleClick}
        enableZoomInteraction={false}
      />
    </div>
  );
}
