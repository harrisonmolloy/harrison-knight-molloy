import { PostList } from "@/app/components/PostList";
import { Divider } from "@/app/components/Divider";
import { Pane } from "components/Pane";

export default function posts() {
  return (
    <>
      <Pane title="/AllPosts">
        <PostList />
      </Pane>
      <Divider />
    </>
  );
}
