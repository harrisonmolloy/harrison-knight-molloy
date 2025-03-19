"use client";

import { Shell } from "components/client/Shell/Shell";
import { Graph } from "components/client/Graph/Graph";

export type PaneContentPropTypes = {
  type: string;
  isActive: boolean;
  isOpen: boolean;
  startUpCommands?: string[];
  onExit: () => void;
};

export function PaneContent({
  type,
  isActive,
  isOpen,
  onExit,
  startUpCommands = [],
}: PaneContentPropTypes) {
  switch (type) {
    case "graph":
      return <Graph isOpen={isOpen} />;

    default:
      return (
        <Shell
          onExit={onExit}
          isActive={isActive}
          isOpen={isOpen}
          startUpCommands={startUpCommands}
        />
      );
  }
}
