import { client } from "lib/client";
import * as query from "lib/queries";

export async function getConfig() {
  return await client.fetch(query.CONFIG_QUERY);
}

export async function getPosts() {
  return await client.fetch(query.POSTS_QUERY);
}

export async function getTags() {
  return await client.fetch(query.TAGS_QUERY);
}

export async function getPost(postId: string) {
  return await client.fetch(query.POST_QUERY, { postId });
}

export async function getPostsByTag(tagName: string) {
  return await client.fetch(query.POSTS_BY_TAGS_QUERY, { tagName });
}
