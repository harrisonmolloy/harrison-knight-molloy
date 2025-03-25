import { Post } from "components/client/Shell/commands/Posts/Post";

import { useShell } from "hooks/useShell";
import { getPostsByTag } from "lib/getFunctions";

export const usePosts = (paneId: number) => {
  const { printLine, printCommand, printLineBreak, showSpinner, popLine } =
    useShell(paneId);

  const posts = async (command: string, ...args: string[]) => {
    printCommand(command);
    printLineBreak();
    switch (args[0]) {
      case "--tag":
      case "-t":
        showSpinner("getting posts");
        printLineBreak();
        const posts = await getPostsByTag(args[1]);
        popLine(2);

        if (posts) {
          for (const post of posts) {
            printLine(<Post key={post._id} post={post} />);
          }

          return 1;
        }

      default:
        printLine("failed to parse command");
        printLineBreak();
        return 0;
    }
  };

  return { posts };
};
