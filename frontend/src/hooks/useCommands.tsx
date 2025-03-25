import { useHelp } from "hooks/commands/useHelp";
import { useUnknown } from "hooks/commands/useUnknown";
import { useClose } from "hooks/commands/useClose";
import { useAbout } from "hooks/commands/useAbout";
import { useExit } from "hooks/commands/useExit";
import { useClear } from "hooks/commands/useClear";
import { usePostList } from "hooks/commands/usePostList";
// import { usePostWithId } from "hooks/commands/usePostWithId";
import { useGraph } from "hooks/commands/useGraph";
import { useContact } from "hooks/commands/useContact";
import { usePanes } from "./usePanes";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "./commands/usePosts";
import { usePost } from "./commands/usePost";

export const useCommands = (paneId: number) => {
  const isRunningRef = useRef(false);
  const isInitiatedRef = useRef(false);
  const { panes } = usePanes();
  const [commandQueue, setCommandQueue] = useState<string[]>([]);

  const { help } = useHelp(paneId);
  const { unknown } = useUnknown(paneId);
  const { close } = useClose(paneId);
  const { about } = useAbout(paneId);
  const { exit } = useExit(paneId);
  const { clear } = useClear(paneId);
  const { postList } = usePostList(paneId);
  // const { postWithId } = usePostWithId(paneId);
  const { graph } = useGraph(paneId);
  const { contact } = useContact(paneId);
  const { posts } = usePosts(paneId);
  const { post } = usePost(paneId);

  const commands: Commands = {
    exit: exit,
    quit: exit,

    close: close,

    clear: clear,
    clr: clear,

    unknown: unknown,

    about: about,

    postList: postList,
    allPosts: postList,

    posts: posts,

    post: post,

    graph: graph,

    contact: contact,
    details: contact,
    email: contact,

    help: help,
  };

  function submitCommand(command: string) {
    // append command to queue
    setCommandQueue([...commandQueue, command]);
  }

  // put intial panes into commad queue if they exit and it is the first time running
  useEffect(() => {
    if (!isInitiatedRef.current && panes[paneId].commandQueue.length > 0) {
      setCommandQueue([...panes[paneId].commandQueue]);
      isInitiatedRef.current = true;
    }
  }, [panes, paneId]);

  useEffect(() => {
    // on each render check if
    if (!isRunningRef.current && commandQueue.length > 0) {
      const nextCommand = commandQueue[0];
      isRunningRef.current = true;
      executeCommand(nextCommand).then(() => {
        // shift command queue
        // // which triggers a re-render
        setCommandQueue(commandQueue.slice(1));
        isRunningRef.current = false;
      });
    }
  });

  async function executeCommand(command: string) {
    const [cmd, ...args] = command.trim().toLowerCase().split(/\s+/);
    let cmdCpy = cmd.slice();

    //
    if (!commands[cmdCpy]) cmdCpy = "unknown";

    // run commandHandler
    const status = await commands[cmdCpy](command, ...args);
    return status;
  }

  return { submitCommand };
};

type CommandHandler = (
  command: string,
  ...args: string[]
) => number | Promise<number>;

interface Commands {
  [alias: string]: CommandHandler;
}
