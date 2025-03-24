"use client";

import { Post } from "./Post";

import { POSTS_QUERYResult } from "types/sanity.types";

import { usePosts } from "hooks/dataHooks";

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
