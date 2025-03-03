import { Graph2d } from "components/Graph2d";
import { getGraphData } from "lib/getGraphData";

export default async function Home() {
  const graphData = await getGraphData();
  return <Graph2d graphData={graphData} />;
}
