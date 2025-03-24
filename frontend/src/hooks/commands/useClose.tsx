import { useShell } from "hooks/useShell";

export const useClose = (paneId: number) => {
  const {
    delay,
    printLine,
    printCommand,
    printLineBreak,
    popLine,
    togglePane,
  } = useShell(paneId);

  const close = async (command: string) => {
    printCommand(command);

    printLine("...closing pane");
    await delay(250);
    popLine();

    togglePane();
    printLine("closed pane");
    printLineBreak();
    return 1;
  };

  return { close };
};
