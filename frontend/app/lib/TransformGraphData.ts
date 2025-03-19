import { Node, Link } from "types/graphDataTypes";
import { POSTS_AND_TAGS_QUERYResult } from "types/sanity.types";

export function transformGraphData({
  tags,
  posts,
}: POSTS_AND_TAGS_QUERYResult) {
  const nodes: Node[] = [];
  const nodeIds = new Set();
  const links: Link[] = [];

  // Helper to add unique nodes
  const addNodeUnique = ({ id, name, type, slug }: Node) => {
    if (!nodeIds.has(id)) {
      nodeIds.add(id);
      nodes.push({ id, name, type, slug });
    }
  };

  // Helper to add link
  const addLink = (link: Link) => {
    links.push(link);
  };

  posts.forEach((post) => {
    addNodeUnique({
      id: post._id,
      type: post._type,
      name: post.title || "",
    });

    post.tags?.forEach((postTag) => {
      addNodeUnique({
        id: postTag._id,
        type: postTag._type,
        name: postTag.title,
        slug: postTag.slug.current,
      });

      addLink({
        source: postTag._id,
        target: post._id,
      });
    });
  });

  tags.forEach((tag) => {
    addNodeUnique({
      id: tag._id,
      type: tag._type,
      name: tag.title,
      slug: tag.slug.current,
    });

    tag.tags?.forEach((tagTag) => {
      addNodeUnique({
        id: tagTag._id,
        type: tagTag._type,
        name: tagTag.title,
        slug: tagTag.slug.current,
      });
      addLink({
        source: tagTag._id,
        target: tag._id,
      });
    });
  });

  return { nodes, links };
}
