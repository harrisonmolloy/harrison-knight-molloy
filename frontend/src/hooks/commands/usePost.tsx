import { Post } from "components/client/Shell/commands/Posts/Post";

import { useShell } from "hooks/useShell";

import { getPost } from "lib/getFunctions";

export const usePost = (paneId: number) => {
  const { printLine, printCommand, printLineBreak, showSpinner, popLine } =
    useShell(paneId);

  const post = async (command: string, ...args: string[]) => {
    printCommand(command);
    printLineBreak();
    if (typeof args[0] === "string") {
      showSpinner("getting posts");
      printLineBreak();
      const post = await getPost(args[0]);
      popLine(2);

      if (post) {
        printLine(<Post key={post._id} post={post} loadOpen={true} />);
        return 1;
      }
    }
    printLine("failed to parse command");
    printLineBreak();
    return 0;
  };

  return { post };
};
