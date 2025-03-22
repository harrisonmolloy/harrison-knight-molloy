import { useHelp } from "hooks/commands/useHelp";
import { useUnknown } from "hooks/commands/useUnknown";
import { useClose } from "hooks/commands/useClose";
import { useAbout } from "hooks/commands/useAbout";
import { useExit } from "hooks/commands/useExit";
import { useClear } from "hooks/commands/useClear";
import { usePostList } from "hooks/commands/usePostList";
import { usePostWithId } from "hooks/commands/usePostWithId";
import { useGraph } from "hooks/commands/useGraph";
import { useContact } from "hooks/commands/useContact";
import { usePanes } from "./usePanes";

type CommandHandler = (
  command: string,
  ...args: string[]
) => number | Promise<number>;

interface Commands {
  [alias: string]: CommandHandler;
}

export const useCommands = (paneId: number) => {
  const { help } = useHelp(paneId);
  const { unknown } = useUnknown(paneId);
  const { close } = useClose(paneId);
  const { about } = useAbout(paneId);
  const { exit } = useExit(paneId);
  const { clear } = useClear(paneId);
  const { postList } = usePostList(paneId);
  const { postWithId } = usePostWithId(paneId);
  const { graph } = useGraph(paneId);
  const { contact } = useContact(paneId);

  const { panes, shiftCommand, appendCommand } = usePanes();

  const commands: Commands = {
    exit: exit,
    quit: exit,

    close: close,

    clear: clear,
    clr: clear,

    unknown: unknown,

    about: about,

    postList: postList,
    posts: postList,

    post: postWithId,

    graph: graph,

    contact: contact,
    details: contact,
    email: contact,

    help: help,
  };

  function submitCommand(command: string) {
    appendCommand(paneId, command);
  }

  async function triggerExecute() {
    // while commands in queue
    while (panes[paneId].commandQueue.length > 0) {
      await executeCommand(shiftCommand(paneId));
    }
  }

  async function executeCommand(command: string) {
    const [cmd, ...args] = command.trim().toLowerCase().split(/\s+/);
    let cmdCpy = cmd.slice();

    if (!commands[cmdCpy]) cmdCpy = "unknown";

    // run commandHandler
    const status = await commands[cmdCpy](command, ...args);
    return status;
  }

  return { submitCommand, triggerExecute, executeCommand };
};
