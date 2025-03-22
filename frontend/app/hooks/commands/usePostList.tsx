import { PostList } from "components/client/Shell/commands/Posts/PostList";
import { useShell } from "hooks/useShell";

export const usePostList = (paneId: number) => {
  const { printLine, printCommand, printLineBreak } = useShell(paneId);

  const postList = (command: string) => {
    printCommand(command);
    printLineBreak();
    printLine(<PostList />);
    printLineBreak();
    return 1;
  };

  return { postList };
};
