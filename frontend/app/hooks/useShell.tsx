import { getConfig } from "lib/getFunctions";
import { usePanes } from "./usePanes";
import { ascii } from "lib/ascii";
import { Graph } from "components/client/Graph/Graph";
import { PostList } from "components/client/Shell/commands/Posts/PostList";

export const useShell = () => {
  const {
    // panes,
    // activePaneId,
    clearHistory,
    removePane,
    // appendPane,
    // togglePane,
    appendHistory,
    // setActivePane,
  } = usePanes();

  async function submitCommand(paneId: number, command: string) {
    switch (command.toLowerCase()) {
      case "help":
        appendHistory(
          paneId,
          <p>$ {command}</p>,
          <p>Available commands: graph, posts, about, contact, exit, clear</p>,
        );
        break;

      case "posts":
        appendHistory(paneId, <p>$ {command}</p>, <PostList />);
        break;

      case "graph":
        appendHistory(
          paneId,
          <p>$ {command}</p>,
          <Graph paneId={paneId} inline={true} />,
        );
        break;

      case "contact":
        appendHistory(paneId, <p>$ {command}</p>, <p>mail@harriknight.com</p>);
        break;

      case "about":
        const config = await getConfig();
        appendHistory(
          paneId,
          <p>$ {command}</p>,
          <div className="flex">
            <pre className="text-[5px] leading-[3px]">{ascii}</pre>
            <div className="ml-1">
              <p>Title: {config?.title}</p>
              <p>Description: {config?.description}</p>
            </div>
          </div>,
        );
        break;

      case "exit":
        removePane(paneId);
        break;

      case "clear":
      case "clr":
        clearHistory(paneId);
        break;

      default:
        appendHistory(
          paneId,
          <p>$ {command}</p>,
          <p>Command not found: {command}</p>,
          <p>Try: graph, posts, about, contact, exit, clear</p>,
        );
    }
  }

  return {
    submitCommand,
  };
};
