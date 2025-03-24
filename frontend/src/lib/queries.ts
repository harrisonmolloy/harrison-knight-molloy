import { defineQuery } from "next-sanity";

export const CONFIG_QUERY = defineQuery(
  `*[_type == "config" && _id == "config"][0]{
      title,
      tagline,
      description
    }`,
);

export const POSTS_QUERY = defineQuery(
  `*[_type == "post"] {
      _id,
      _type,
      title,
      date,
      body[] {
        ...,
        asset-> {
          ...,
          "_key": _id
        }
      },
      tags[]-> {
        _id,
        _type,
        title,
        slug
      }
    }`,
);

export const POST_QUERY = defineQuery(`*[_type == "post" && _id == $postId]{
    _id,
    _type,
    title,
    date,
    body[] {
      ...,
      asset-> {
        ...,
        "_key": _id
      }
    },
    tags[]-> {
      _id,
      _type,
      title,
      slug
    }
  }`);

export const POST_BY_ID_QUERY =
  defineQuery(`*[_type == "post" && _id == $postId][0]{
    _id,
    _type,
    title,
    date,
    body[] {
      ...,
      asset-> {
        ...,
        "_key": _id
      }
    },
    tags[]-> {
      _id,
      _type,
      title,
      slug
    }
  }`);

export const TAGS_QUERY = defineQuery(`*[_type == "tag"] {
      _id,
      _type,
      title,
      slug,
      tags[]-> {
        _id,
        _type,
        title,
        slug
      }
    }`);

export const POSTS_BY_TAGS_QUERY = defineQuery(
  `*[_type == "post" && references(*[_type=="tag" && title match $tagName]._id)] {
      _id,
      _type,
      title,
      date,
      body[] {
        ...,
        asset-> {
          ...,
          "_key": _id
        }
      },
      tags[]-> {
        _id,
        _type,
        title,
        slug
      }
    }`,
);

export const POSTS_AND_TAGS_QUERY = defineQuery(
  `{
    "posts": *[_type == "post"] {
        _id,
        _type,
        title,
        date,
        body[] {
          ...,
          asset-> {
            ...,
            "_key": _id
          }
        },
        tags[]-> {
          _id,
          _type,
          title,
          slug
        }
  }, "tags" : *[_type == "tag"] {
        _id,
        _type,
        title,
        slug,
        tags[]-> {
          _id,
          _type,
          title,
          slug
        }
      }}`,
);
