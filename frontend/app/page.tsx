import { Graph } from "components/Graph";
import { Pane } from "components/Pane";
import { Divider } from "./components/Divider";
import { PostList } from "./components/PostList";

export default async function Home() {
  return (
    <>
      <Pane title="/Graph">
        <Graph />
      </Pane>
      <Divider />
      <Pane title="/Posts" initOpen={false}>
        <PostList />
      </Pane>
    </>
  );
}
