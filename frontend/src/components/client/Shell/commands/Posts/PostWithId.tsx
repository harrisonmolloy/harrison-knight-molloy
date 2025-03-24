"use client";

import { Post } from "./Post";
import { Spinner } from "components/Spinner";

import { usePostById } from "hooks/dataHooks";

export function PostWithId({ postId }: { postId: string }) {
  const { post, error, isLoading } = usePostById(postId);

  if (isLoading) return <Spinner message={"getting post with id: " + postId} />;
  if (error || post === null) return "failed to load post with id: " + postId;

  return <Post post={post} />;
}
