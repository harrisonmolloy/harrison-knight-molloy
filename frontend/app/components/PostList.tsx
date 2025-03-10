import { getPosts } from "lib/queries";
import { Post } from "./Post";

export async function PostList() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
