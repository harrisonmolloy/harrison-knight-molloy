import { getGraphData } from "lib/getGraphData";

import { Graph3d } from "components/Graph3d";
import { Graph2d } from "components/Graph2d";

export async function Graph({ threeD = false }: { threeD?: boolean }) {
  const graphData = await getGraphData();
  return threeD ? (
    <Graph3d graphData={graphData} />
  ) : (
    <Graph2d graphData={graphData} />
  );
}
