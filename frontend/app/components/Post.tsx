"use client";

import { Card } from "components/Card";
import { CardRow } from "components/CardRow";
import { CardBody } from "components/CardBody";
import { POSTS_QUERYResult } from "lib/sanity.types";
import Link from "next/link";
import { useState } from "react";

export function Post({ post }: { post: POSTS_QUERYResult[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  let date;
  if (post.date) {
    date = new Date(post.date).toLocaleDateString();
  }
  return (
    <Card key={post._id}>
      <CardRow>
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
      </CardRow>
      <CardBody post={post} isOpen={isOpen} />
      <ViewMoreRow post={post} isOpen={isOpen} onClick={handleClick} />
    </Card>
  );
}

function ViewMoreRow({
  post,
  isOpen,
  onClick,
}: {
  post: POSTS_QUERYResult[0];
  isOpen: boolean;
  onClick: () => void;
}) {
  if (post.body.length < 2) return <></>;

  return (
    <CardRow justify>
      <button
        onClick={onClick}
        className="cursor-pointer text-light-blue underline dark:text-dark-blue"
      >
        {isOpen ? "Close" : "View More"}
      </button>
    </CardRow>
  );
}
