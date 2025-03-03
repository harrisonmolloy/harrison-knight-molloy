import { Graph3d } from "components/Graph3d";
import { getGraphData } from "lib/getGraphData";

export default async function Home() {
  const graphData = await getGraphData();
  return <Graph3d graphData={graphData} />;
}
