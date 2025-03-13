import { Graph } from "components/Graph";
import { Pane } from "components/Pane";
import { PostList } from "./components/PostList";
import { Divider } from "./components/Divider";

export default async function Home() {
  return (
    <>
      <Divider />
      <Pane title="/Graph">
        <Graph />
      </Pane>
      <Divider />
      <Pane title="/Posts" initOpen={false}>
        <PostList />
      </Pane>
      <Divider />
    </>
  );
}
