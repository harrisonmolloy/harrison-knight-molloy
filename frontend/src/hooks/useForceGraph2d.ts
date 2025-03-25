import { useEffect, useRef, useState } from "react";
import { NodeObject } from "react-force-graph-2d";

export const useForceGraph2d = () => {
  const [size, setSize] = useState({ width: 400, height: 500 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    handleResize(); // set initial size
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  });

  function handleResize() {
    if (
      wrapperRef.current &&
      (wrapperRef.current.clientWidth !== size.width ||
        wrapperRef.current.clientHeight !== size.height)
    ) {
      setSize({
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight,
      });
    }
  }

  function getColorVar(str: string) {
    // console.log("getting col", getComputedStyle(document.body));
    return getComputedStyle(document.body).getPropertyValue(str);
  }

  function getMediaMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function drawLinkColor() {
    const mode = getMediaMode();
    return getColorVar(`--color-${mode}-fg`);
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

  return { wrapperRef, size, drawLinkColor, drawNode, drawPointerArea };
};
