"use client";

import { usePosts } from "hooks/dataHooks";
import { POSTS_QUERYResult } from "types/sanity.types";
import { Post } from "components/client/Shell/commands/Posts/Post";

export function PostList() {
  const { posts, error, isLoading } = usePosts();
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {posts.map((post: POSTS_QUERYResult[0]) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
