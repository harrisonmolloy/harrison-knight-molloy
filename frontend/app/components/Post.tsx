import { Card } from "components/Card";
import { CardRow } from "components/CardRow";
import { POSTS_QUERYResult } from "lib/sanity.types";
import { Blocks } from "components/Blocks";
import Link from "next/link";

export function Post({ post }: { post: POSTS_QUERYResult[0] }) {
  let date;
  if (post.date) {
    date = new Date(post.date).toLocaleDateString();
  }
  return (
    <Card key={post._id}>
      <CardRow justify>
        <h2>{post.title}</h2>
        <p>{date}</p>
      </CardRow>

      <Body post={post} />
      <CardRow>
        {post.tags?.map((tag) => (
          <Link
            className="text-stone-400"
            href={`/posts/${tag.slug.current}`}
            key={tag._id}
          >
            #{tag.title.replace(" ", "-")}
          </Link>
        ))}
      </CardRow>
    </Card>
  );
}

function Body({ post }: { post: POSTS_QUERYResult[0] }) {
  if (post.body) {
    return <Blocks blocks={post.body} />;
  }
}
