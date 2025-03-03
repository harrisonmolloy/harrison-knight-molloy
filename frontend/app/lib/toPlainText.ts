import { BlockContent } from "lib/sanity.types";

export function toPlainText(blockContent: BlockContent | null) {
  if (blockContent != null) {
    return (
      blockContent
        .map((block) => {
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
