import { client } from "./client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageAsset } from "./sanity.types";

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageAsset) {
  return builder.image(source);
}
