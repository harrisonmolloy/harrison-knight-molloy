import { client } from "lib/client";

export const fetcher = (query: string) => client.fetch(query);

export const fetcherWithParam = ([query, param]: [string, string]) =>
  client.fetch(query, { param });
