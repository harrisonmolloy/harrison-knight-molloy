import { Graph } from "components/Graph";
import { PostList } from "components/PostList";

export default async function Home() {
  return (
    <>
      <Graph />
      <PostList />
    </>
  );
}
