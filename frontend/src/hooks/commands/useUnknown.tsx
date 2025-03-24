import { useShell } from "hooks/useShell";

export const useUnknown = (paneId: number) => {
  const { printLine, printCommand, printLineBreak } = useShell(paneId);

  const unknown = (command: string) => {
    printCommand(command);
    printLineBreak();
    printLine(`command "${command}" not found`);
    printLineBreak();
    return 1;
  };

  return { unknown };
};
