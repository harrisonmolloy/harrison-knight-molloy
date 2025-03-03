import { Node, Link } from "lib/graphDataTypes";
import { getPosts, getTags } from "lib/queries";

export async function getGraphData() {
  const tags = await getTags();
  const posts = await getPosts();

  const nodes: Node[] = [];
  const nodeIds = new Set();
  const links: Link[] = [];

  // Helper to add unique nodes
  const addNodeUnique = ({ id, name, type }: Node) => {
    if (!nodeIds.has(id)) {
      nodeIds.add(id);
      nodes.push({ id, name, type });
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
    });

    tag.tags?.forEach((tagTag) => {
      addNodeUnique({
        id: tagTag._id,
        type: tagTag._type,
        name: tagTag.title,
      });
      addLink({
        source: tagTag._id,
        target: tag._id,
      });
    });
  });

  return { nodes, links };
}
