import { PostWithId } from "components/client/Shell/commands/Posts/PostWithId";
import { useShell } from "hooks/useShell";

export const usePostWithId = (paneId: number) => {
  const { printLine, popLine, printCommand, printLineBreak } = useShell(paneId);

  const postWithId = (command: string, ...args: string[]) => {
    printCommand(command);
    printLineBreak();
    if (!(typeof args[0] === "string")) {
      printLine("Please supply a post id as first argument to post");
      printLineBreak();
      return 0;
    }
    popLine();
    printLineBreak();
    printLine(<PostWithId postId={args[0]} />);
    printLineBreak();
    return 1;
  };

  return { postWithId };
};
