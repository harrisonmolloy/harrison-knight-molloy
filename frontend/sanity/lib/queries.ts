import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`*[_type == "post"]`);

export const CONFIG_QUERY = defineQuery(`*[_id == "config"][0]{
    title,
    tagline,
    description
  }`);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post"] {
    _id,
    title,
    tags[]-> {
      _id,
      title
    }
  }`,
);

export const TAGS_QUERY = defineQuery(
  `*[_type == "tag"] {
    _id,
    title,
    tags[]-> {
      _id,
      title
    }
  }`,
);
