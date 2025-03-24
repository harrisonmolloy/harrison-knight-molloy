import { Graph } from "components/client/Graph/Graph";
import { useShell } from "hooks/useShell";

export const useGraph = (paneId: number) => {
  const { printLine, printCommand, printLineBreak, appendPane } =
    useShell(paneId);

  const graph = (command: string, ...args: string[]) => {
    console.log("running graph with args:", ...args);
    if (args[0] == "inline") {
      printCommand(command);
      printLineBreak();
      printLine(<Graph paneId={paneId} inline={true} />);
      printLineBreak();
    } else {
      printCommand(command);
      printLine("spawning graph in new pane");
      appendPane({
        title: "graph",
        isOpen: true,
        isActive: false,
        type: "graph",
        commandQueue: [],
        history: [],
      });
      printLineBreak();
    }
    return 1;
  };

  return { graph };
};
