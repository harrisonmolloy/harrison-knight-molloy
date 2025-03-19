"use client";

import { useState } from "react";

type ShellInputPropTypes = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  onSubmit: (command: string) => void;
};

export function ShellInput({ onSubmit, inputRef }: ShellInputPropTypes) {
  const [command, setCommand] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSubmit(command);
      setCommand("");
    }
  }

  return (
    <div className="flex">
      <span>$</span>
      <input
        ref={inputRef}
        type="text"
        name="Terminal Input"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        onKeyDown={handleKeyDown}
        className="ml-2 w-full max-w-full text-wrap outline-0"
        autoFocus
      />
    </div>
  );
}
