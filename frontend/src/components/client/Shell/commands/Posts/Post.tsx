"use client";

import Link from "next/link";

import { useState } from "react";

import { ViewMoreButton } from "components/server/ViewMoreButton";
import { Article } from "components/server/Article";
import { BlockAccordian } from "components/server/BlockAccordian";
import { Row } from "components/server/Row";

import { POSTS_QUERYResult } from "types/sanity.types";

type PostProps = { post: POSTS_QUERYResult[0] };

export function Post({ post }: PostProps) {
  const [isOpen, setIsOpen] = useState(false);

  let date;
  if (post.date) {
    date = new Date(post.date).toLocaleDateString();
  }
  return (
    <Article key={post._id}>
      <Row>
        <p className="dark:text-dark-bright-black text-light-bright-black">
          {"> Post"}
        </p>
        <p className="dark:text-dark-bright-black text-light-bright-black">
          {"-d " + date}
        </p>
        <h2>{"-t " + post.title}</h2>
        <p className="text-light-bright-magenta dark:text-dark-bright-magenta">
          {"--tags "}
        </p>
        {post.tags?.map((tag) => (
          <Link
            className="text-light-bright-magenta dark:text-dark-bright-magenta"
            href={`/posts/${tag.slug.current}`}
            key={tag._id}
          >
            #{tag.title.replace(" ", "-")}
          </Link>
        ))}
      </Row>
      <BlockAccordian post={post} isOpen={isOpen} />
      <Row justify>
        <ViewMoreButton
          post={post}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Row>
    </Article>
  );
}
