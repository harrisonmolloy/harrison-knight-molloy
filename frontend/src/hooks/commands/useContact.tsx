import { useShell } from "hooks/useShell";

export const useContact = (paneId: number) => {
  const { printLine, printCommand, printLineBreak } = useShell(paneId);

  const contact = (command: string) => {
    printCommand(command);
    printLineBreak();
    printLine("mail@harriknight.com");
    printLineBreak();
    return 1;
  };

  return { contact };
};
