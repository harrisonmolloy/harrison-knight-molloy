import Image from "next/image";

import { POSTS_QUERYResult } from "types/sanity.types";

export function BlockImageComponent({
  blockImage,
}: {
  blockImage: POSTS_QUERYResult[0]["body"][0];
}) {
  if (blockImage.asset?.url) {
    return (
      <Image
        src={blockImage.asset.url}
        alt={blockImage.alt}
        width={blockImage.asset.metadata?.dimensions?.width}
        height={blockImage.asset.metadata?.dimensions?.height}
      />
    );
  }
}
