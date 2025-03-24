import { ascii } from "lib/ascii";
import { getConfig } from "lib/getFunctions";
import { useShell } from "hooks/useShell";

export const useAbout = (paneId: number) => {
  const { printLine, printCommand, printLineBreak, popLine, showSpinner } =
    useShell(paneId);

  const about = async (command: string) => {
    printCommand(command);

    showSpinner("getting config");
    printLineBreak();
    const config = await getConfig();
    popLine(2);

    printLine(
      <div className="flex">
        <pre className="text-[5px] leading-[3px]">{ascii}</pre>
        <div className="ml-1">
          <p>Title: {config?.title}</p>
          <p>Description: {config?.description}</p>
        </div>
      </div>,
    );
    printLineBreak();
    return 1;
  };

  return { about };
};
