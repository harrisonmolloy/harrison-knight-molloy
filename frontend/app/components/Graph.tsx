import { getGraphData } from "lib/getGraphData";
import { Graph2d } from "components/Graph2d";

export async function Graph() {
  const graphData = await getGraphData();
  return <Graph2d graphData={graphData} />;
}
