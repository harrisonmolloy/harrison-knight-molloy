"use client";

import { useGraphData } from "lib/dataHooks";
import { Graph2d } from "components/client/Graph2d";

export function Graph() {
  const { graphData, error, isLoading } = useGraphData();

  if (error) return <div className="p-2">failed to load</div>;
  if (isLoading) return <div className="p-2">loading...</div>;

  // render data
  return <Graph2d graphData={graphData} />;
}
