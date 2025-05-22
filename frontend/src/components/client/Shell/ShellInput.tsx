"use client";

import { useCommands } from "hooks/useCommands";
import { useState } from "react";

type ShellInputPropTypes = {
  paneId: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function ShellInput({ paneId, inputRef }: ShellInputPropTypes) {
  const [command, setCommand] = useState("");
  const { submitCommand } = useCommands(paneId);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputRef.current) {
      submitCommand(command);
      setCommand("");
    }
  };

  return (
    <div className="flex">
      <span>$</span>
      <input
        ref={inputRef}
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
