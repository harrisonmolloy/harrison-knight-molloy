import useSWR from "swr";
import { transformGraphData } from "lib/TransformGraphData";

import * as query from "lib/queries";
import { fetcher, fetcherWithParam } from "lib/swrFunctions";

export function usePosts() {
  const { data, error, isLoading } = useSWR(query.POSTS_QUERY, fetcher);
  return {
    posts: data,
    error: error,
    isLoading,
  };
}

export function useConfig() {
  const { data, error, isLoading } = useSWR(query.CONFIG_QUERY, fetcher);
  return {
    posts: data,
    error: error,
    isLoading,
  };
}

export function useTags() {
  const { data, error, isLoading } = useSWR(query.TAGS_QUERY, fetcher);
  return {
    posts: data,
    error: error,
    isLoading,
  };
}

export function useGraphData() {
  const { data, error, isLoading } = useSWR(
    query.POSTS_AND_TAGS_QUERY,
    fetcher,
  );
  let graphData;
  if (data) {
    graphData = transformGraphData(data);
  }
  return {
    graphData,
    error: error,
    isLoading,
  };
}

export function usePost(postId: string) {
  console.log(postId);
  const { data, error, isLoading } = useSWR(
    [query.POST_QUERY, { postId }],
    fetcherWithParam,
  );
  return {
    post: data,
    error,
    isLoading,
  };
}

export function usePostById(postId: string) {
  console.log(postId);
  const { data, error, isLoading } = useSWR(
    [query.POST_BY_ID_QUERY, { postId }],
    fetcherWithParam,
  );
  return {
    post: data,
    error,
    isLoading,
  };
}

export function usePostByTag(tagName: string) {
  const { data, error, isLoading } = useSWR(
    [query.POSTS_BY_TAGS_QUERY, { tagName }],
    fetcherWithParam,
  );
  return {
    posts: data,
    error,
    isLoading,
  };
}
