import { getPosts } from "lib/queries";
import { Post } from "./Post";

export async function PostList() {
  const posts = await getPosts();
  return (
    <div className="mr-12 flex h-full flex-col gap-6 overflow-x-scroll scroll-smooth py-12">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
