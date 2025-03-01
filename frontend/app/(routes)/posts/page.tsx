import { Card, CardRow } from "components/Card";
import { getPosts } from "lib/queries";
import { BlockContent } from "lib/sanity.types";

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

function toPlainText(blocks: BlockContent | null) {
  if (blocks != null) {
    // loop through each blo
    return (
      blocks
        // loop through each block
        .map((block) => {
          // if it's not a text block with children,
          // return nothing
          if (block._type !== "block" || !block.children) {
            return "";
          }
          // loop through the children spans, and join the
          // text strings
          return block.children.map((child) => child.text).join("");
        })
        // join the paragraphs leaving split by two linebreaks
        .join("\n\n")
    );
  }
}
