import { client } from "lib/client";
import { defineQuery } from "next-sanity";

export async function getConfig() {
  const CONFIG_QUERY = defineQuery(
    `*[_type == "config" && _id == "config"][0]{ title, tagline, description }`,
  );
  const result = await client.fetch(CONFIG_QUERY);
  return result;
}

export async function getPosts() {
  const POSTS_QUERY = defineQuery(
    `*[_type == "post"] { _id, _type, title, date, body, tags[]-> { _id, _type, title, slug }}`,
  );
  const result = await client.fetch(POSTS_QUERY);
  return result;
}

export async function getPost() {
  const POST_QUERY = defineQuery(`*[_type == "post" && _id == id]`);
  const result = await client.fetch(POST_QUERY);
  return result;
}

export async function getTags() {
  const TAGS_QUERY = defineQuery(
    `*[_type == "tag"] { _id, _type, title, slug, tags[]-> { _id, _type, title, slug }}`,
  );
  const result = await client.fetch(TAGS_QUERY);
  return result;
}

export async function getPostsByTag(tagName: string) {
  const params = { tagName };
  const POSTS_BY_TAGS_QUERY = defineQuery(
    `*[_type == "post" && references(*[_type=="tag" && title match $tagName]._id)] { _id, _type, title, date, body, tags[]-> { _id, _type, title, slug }}`,
  );
  const result = await client.fetch(POSTS_BY_TAGS_QUERY, params);
  return result;
}
