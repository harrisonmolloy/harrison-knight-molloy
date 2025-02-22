import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`*[_type == "post"]`);

export const SETTINGS_QUERY = defineQuery(`*[_id == "settings"][0]{
    title,
    tagline,
    description
  }`);
