import { Graph3d } from "@/app/components/Graph3d";
import { getGraphData } from "@/app/lib/getGraphData";

export default async function Home() {
  const graphData = await getGraphData();
  return <Graph3d graphData={graphData} />;
}
