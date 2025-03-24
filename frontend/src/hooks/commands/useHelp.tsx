import { useShell } from "hooks/useShell";
import { commands } from "lib/commands";

export const useHelp = (paneId: number) => {
  const { printLine, printCommand, printLineBreak } = useShell(paneId);

  const help = (command: string) => {
    printCommand(command);
    printLineBreak();
    printLine("usage: help <command>");
    printLineBreak();
    printLine("description: " + commands[command].description);
    printLineBreak();
    printLine("available commands:");
    printLineBreak();
    for (const key in commands) {
      printLine(commands[key].aliases.join(", "));
      printLine(<pre>{"\t" + commands[key].description}</pre>);
      printLineBreak();
    }
    return 1;
  };

  return { help };
};
