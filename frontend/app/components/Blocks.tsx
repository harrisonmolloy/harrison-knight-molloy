import { PortableText } from "@portabletext/react";
import { POSTS_QUERYResult } from "lib/sanity.types";
import { BlockImageComponent } from "components/BlockImageComponent";

const componentTypes = {
  types: {
    blockImage: ({ value }: { value: POSTS_QUERYResult[0]["body"][0] }) => (
      <BlockImageComponent blockImage={value} />
    ),
  },
};

export function Blocks({ blocks }: { blocks: POSTS_QUERYResult[0]["body"] }) {
  return <PortableText value={blocks} components={componentTypes} />;
}
