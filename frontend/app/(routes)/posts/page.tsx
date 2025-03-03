import { Card, CardRow } from "components/Card";
import { getPosts } from "lib/queries";
import { toPlainText } from "lib/toPlainText";

export default async function posts() {
  const posts = await getPosts();
  return (
    <>
      {posts.map((post) => (
        <Card key={post?._id}>
          <CardRow>
            <h2>{post?.title}</h2>
            <p>{post?.date}</p>
          </CardRow>
          <CardRow>{toPlainText(post?.body)}</CardRow>
          <CardRow>
            {post?.tags?.map((tag) => <a key={tag?._id}>{tag?.title}</a>)}
          </CardRow>
        </Card>
      ))}
    </>
  );
}
