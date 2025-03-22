"use client";

import { usePostById } from "hooks/dataHooks";
import { Post } from "components/client/Shell/commands/Posts/Post";
import { Spinner } from "components/Spinner";

export function PostWithId({ postId }: { postId: string }) {
  const { post, error, isLoading } = usePostById(postId);

  if (isLoading) return <Spinner message={"getting post with id: " + postId} />;
  if (error || post === null) return "failed to load post with id: " + postId;

  return <Post post={post} />;
}
