"use client";

import dynamic from "next/dynamic";

import { useForceGraph2d } from "hooks/useForceGraph2d";

import { NodeObject } from "react-force-graph-2d";
import { GraphData } from "types/graphDataTypes";
import { usePanes } from "hooks/usePanes";

// Hold off rendering component until window is defined.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

type Graph2dPropTypes = {
  paneId?: number;
  inline: boolean;
  graphData: GraphData;
};

export function Graph2d({ graphData, inline }: Graph2dPropTypes) {
  const { wrapperRef, size, drawLinkColor, drawNode, drawPointerArea } =
    useForceGraph2d();
  const { appendPane } = usePanes();

  const handleClick = (node: NodeObject) => {
    let command;
    if (node.type == "post") {
      command = `${node.type} ${node.id}`;
    } else {
      command = `posts --tag ${node.name.toLowerCase()}`;
    }
    appendPane({
      title: `shell/`,
      isOpen: true,
      isActive: false,
      type: "shell",
      history: [],
      commandQueue: [command],
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={`${inline ? "h-[60svh] border-y" : "flex-1 overflow-hidden"}`}
    >
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
        enablePanInteraction={false}
      />
    </div>
  );
}
