import { Post } from "@/app/components/Post";
import { getPostsByTag } from "lib/queries";
import { getTags } from "lib/queries";
import { Divider } from "@/app/components/Divider";
import { Pane } from "components/Pane";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  return (
    <>
      <Pane title={`/AllPosts/${tag}`}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </Pane>
      <Divider />
    </>
  );
}

export async function generateStaticParams() {
  const tags = await getTags();

  return tags.map((tag) => ({
    slug: tag.slug.current,
  }));
}
