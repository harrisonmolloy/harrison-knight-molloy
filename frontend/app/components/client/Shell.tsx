"use client";

import { useState } from "react";
import { TerminalInput } from "./TerminalInput";

type ShellProps = {
  onExit: (position: number) => void;
};

export function Shell({ onExit }: ShellProps) {
  const [history, setHistory] = useState<{ command: string; output: string }[]>(
    [],
  );

  function updateHistory(command: string, output: string) {
    setHistory([...history, { command, output }]);
  }

  function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        updateHistory(command, "Available commands: projects, about, contact");
        break;
      case "exit":
        updateHistory(command, "...exiting");
        onExit(1);
        break;
      case "projects":
        updateHistory(command, "...Fetching All Projects");
        break;
      default:
        updateHistory(command, `Command not found: ${command}`);
    }
  }

  return (
    <div className="p-2">
      {history.map((item, idx) => (
        <div key={idx}>
          <div>$ {item.command}</div>
          <div>{item.output}</div>
          <br />
        </div>
      ))}
      <TerminalInput onSubmit={executeCommand} />
    </div>
  );
}
