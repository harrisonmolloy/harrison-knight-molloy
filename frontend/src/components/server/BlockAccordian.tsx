import { BlockList } from "components/server/BlockList";
import { POSTS_QUERYResult } from "types/sanity.types";

export function BlockAccordian({
  post,
  isOpen,
}: {
  post: POSTS_QUERYResult[0];
  isOpen: boolean;
}) {
  if (!post.body) return;

  if (!isOpen) {
    return <BlockList blocks={post.body.slice(0, 1)} />;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <BlockList blocks={post.body} />
    </div>
  );
}
