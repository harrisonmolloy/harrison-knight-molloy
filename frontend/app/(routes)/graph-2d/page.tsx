import { Graph2d } from "@/app/components/Graph2d";
import { getGraphData } from "@/app/lib/getGraphData";

export default async function Home() {
  const graphData = await getGraphData();
  return <Graph2d graphData={graphData} />;
}
