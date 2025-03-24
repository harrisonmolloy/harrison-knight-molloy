import { client } from "lib/client";

interface Params {
  [param: string]: string | number;
}

export const fetcher = (query: string) => client.fetch(query);

export const fetcherWithParam = ([query, params]: [string, Params]) =>
  client.fetch(query, params);
