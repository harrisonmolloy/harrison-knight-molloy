import { Card, CardRow } from "components/Card";
import { getPosts } from "lib/queries";
import { toPlainText } from "lib/toPlainText";

export async function PostList() {
  const posts = await getPosts();
  return (
    <div className="fixed top-0 right-0 inline-flex h-full flex-col gap-8 overflow-y-scroll scroll-smooth p-12">
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
    </div>
  );
}
