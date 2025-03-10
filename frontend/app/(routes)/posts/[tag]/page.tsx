import { Post } from "@/app/components/Post";
import { getPostsByTag } from "lib/queries";
import { getTags } from "lib/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);
  return (
    <>
      <h1>{tag}</h1>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}

export async function generateStaticParams() {
  const tags = await getTags();

  return tags.map((tag) => ({
    slug: tag.slug.current,
  }));
}
