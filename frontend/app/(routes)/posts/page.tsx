import { Post } from "@/app/components/Post";
import { getPosts } from "lib/queries";

export default async function posts() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
