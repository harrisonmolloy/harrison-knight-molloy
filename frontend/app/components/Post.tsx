import { Card, CardRow } from "components/Card";
import { toPlainText } from "lib/toPlainText";
import { POSTS_QUERYResult } from "lib/sanity.types";
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
      <CardRow>{toPlainText(post.body || null)}</CardRow>
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
