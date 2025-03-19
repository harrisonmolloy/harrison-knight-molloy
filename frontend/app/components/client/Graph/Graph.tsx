"use client";

import { useGraphData } from "hooks/dataHooks";
import { Graph2d } from "components/client/Graph/Graph2d";

type GrapPropTypes = {
  isOpen?: boolean;
  inline?: boolean;
};
export function Graph({ isOpen = true, inline = true }: GrapPropTypes) {
  const { graphData, error, isLoading } = useGraphData();

  if (error) return <div className="p-2">failed to load</div>;
  if (isLoading) return <div className="p-2">loading...</div>;
  if (graphData)
    return <Graph2d isOpen={isOpen} inline={inline} graphData={graphData} />;
}
