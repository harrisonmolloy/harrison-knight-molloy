import { defineQuery } from "next-sanity";

export const POST_QUERY = defineQuery(`*[_type == "post"]`);
