"use client";

import { memo } from "react";

import { useGraphData } from "hooks/dataHooks";
import { Graph2d } from "components/client/Graph/Graph2d";
import { Spinner } from "components/Spinner";

type GrapPropTypes = {
  inline?: boolean;
  paneId: number;
};

export const Graph = memo(function Graph({
  paneId,
  inline = false,
}: GrapPropTypes) {
  const { graphData, error, isLoading } = useGraphData();

  if (error) return "failed to load graph";
  if (isLoading) return <Spinner message="building graph" />;
  if (graphData) {
    return <Graph2d paneId={paneId} inline={inline} graphData={graphData} />;
  }
});
