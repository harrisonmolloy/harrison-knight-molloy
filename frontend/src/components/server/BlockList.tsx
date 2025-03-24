import { PortableText } from "@portabletext/react";
import { BlockImageComponent } from "components/server/BlockImageComponent";
import { POSTS_QUERYResult } from "types/sanity.types";

const componentTypes = {
  types: {
    blockImage: ({ value }: { value: POSTS_QUERYResult[0]["body"][0] }) => (
      <BlockImageComponent blockImage={value} />
    ),
  },
};

export function BlockList({
  blocks,
}: {
  blocks: POSTS_QUERYResult[0]["body"];
}) {
  return <PortableText value={blocks} components={componentTypes} />;
}
