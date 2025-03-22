"use client";

import { useCommands } from "hooks/useCommands";
import { usePanes } from "hooks/usePanes";
import { useCallback, useEffect, useState } from "react";

type ShellInputPropTypes = {
  paneId: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function ShellInput({ paneId, inputRef }: ShellInputPropTypes) {
  const [command, setCommand] = useState("");
  const { panes } = usePanes();
  const { executeCommand } = useCommands(paneId);

  const runStartupCommands = useCallback(async () => {
    if (panes[paneId].commandQueue) {
      const startUpCommands = panes[paneId].commandQueue;
      for (const command of startUpCommands) {
        await executeCommand(command);
      }
    }
  }, []);

  const handleEnter = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputRef.current) {
      inputRef.current.disabled = true;
      await executeCommand(command);
      inputRef.current.disabled = false;
      setCommand("");
    }
  };

  useEffect(() => {
    runStartupCommands();
  }, [runStartupCommands]);

  return (
    <div className="flex">
      <span>$</span>
      <input
        ref={inputRef}
        // autoFocus
        type="text"
        name="Terminal Input"
        value={command}
        className="ml-2 w-full max-w-full text-wrap outline-0"
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  );
}
