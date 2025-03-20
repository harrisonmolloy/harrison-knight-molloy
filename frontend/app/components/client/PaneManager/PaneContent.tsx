"use client";

import { Shell } from "components/client/Shell/Shell";
import { Graph } from "components/client/Graph/Graph";
import { useAtomValue } from "jotai";
import { panesAtom } from "store/atoms";

export type PaneContentPropTypes = {
  paneId: number;
};

export function PaneContent({ paneId }: PaneContentPropTypes) {
  const { type } = useAtomValue(panesAtom)[paneId];

  switch (type) {
    case "graph":
      return <Graph paneId={paneId} inline={false} />;

    default:
      return <Shell paneId={paneId} />;
  }
}
