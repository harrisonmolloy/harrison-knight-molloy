"use client";

import { useGraphData } from "lib/dataHooks";
import { Graph2d } from "components/client/Graph2d";

export function Graph() {
  const { graphData, error, isLoading } = useGraphData();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return <Graph2d graphData={graphData} />;
}
