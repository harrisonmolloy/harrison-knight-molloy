"use client";

import { useShell } from "hooks/useShell";
import { useState } from "react";

type ShellInputPropTypes = {
  paneId: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function ShellInput({ paneId, inputRef }: ShellInputPropTypes) {
  const [command, setCommand] = useState("");
  const { submitCommand } = useShell();

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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitCommand(paneId, command);
            setCommand("");
          }
        }}
      />
    </div>
  );
}
