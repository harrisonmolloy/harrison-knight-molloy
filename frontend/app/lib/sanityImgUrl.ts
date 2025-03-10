import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageAsset } from "./sanity.types";

const urlBuilder = imageUrlBuilder(client);

export function sanityImgUrl({ asset }: { asset: SanityImageAsset }) {
  return urlBuilder.image(asset).fit("max").auto("format").url();
}
