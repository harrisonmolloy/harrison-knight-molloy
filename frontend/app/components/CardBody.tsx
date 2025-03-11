import { Blocks } from "components/Blocks";
import { POSTS_QUERYResult } from "../lib/sanity.types";

export function CardBody({
  post,
  isOpen,
}: {
  post: POSTS_QUERYResult[0];
  isOpen: boolean;
}) {
  if (!post.body) return;

  if (!isOpen) {
    return <Blocks blocks={post.body.slice(0, 1)} />;
  }

  return <Blocks blocks={post.body} />;
}
