"use client";

import { RefObject, useState } from "react";

type TerminalInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (command: string) => void;
};

export function TerminalInput({ onSubmit, inputRef }: TerminalInputProps) {
  const [command, setCommand] = useState("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSubmit(command);
      setCommand("");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCommand(event.target.value);
  }

  return (
    <div className="flex">
      <span>$</span>
      <input
        ref={inputRef}
        type="text"
        name="Terminal Input"
        value={command}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="ml-2 w-full max-w-full text-wrap outline-0"
        autoFocus
      />
    </div>
  );
}
