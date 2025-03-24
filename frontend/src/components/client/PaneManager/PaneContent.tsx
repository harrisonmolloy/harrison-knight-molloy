"use client";

import { Shell } from "components/client/Shell/Shell";
import { Graph } from "components/client/Graph/Graph";

import { usePanes } from "hooks/usePanes";

export type PaneContentPropTypes = {
  paneId: number;
};

export function PaneContent({ paneId }: PaneContentPropTypes) {
  const { panes } = usePanes();
  const { type } = panes[paneId];

  switch (type) {
    case "graph":
      return <Graph paneId={paneId} />;

    default:
      return <Shell paneId={paneId} />;
  }
}
