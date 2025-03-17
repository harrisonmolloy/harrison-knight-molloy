"use client";

import { useRef, useEffect, ReactElement } from "react";
import { TerminalInput } from "components/client/TerminalInput";
import { PaneType } from "components/client/PaneManager";
import { PostList } from "components/client/PostList";
import { Graph } from "./Graph";

type ShellProps = {
  onExit: (position: number) => void;
  clearHistory: (position: number) => void;
  updateHistory: (
    position: number,
    command: string,
    output: ReactElement,
  ) => void;
  position: number;
  panes: PaneType[];
  isActive: boolean;
};

export function Shell({
  position,
  panes,
  clearHistory,
  isActive,
  onExit,
  updateHistory,
}: ShellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]); // Focus only when isActive changes

  async function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        updateHistory(
          position,
          command,
          <p>Available commands: posts, about, contact</p>,
        );
        break;
      case "exit":
        onExit(position);
        break;
      case "clear":
      case "clr":
        clearHistory(position);
        break;
      case "posts":
        updateHistory(position, command, <PostList />);
        break;
      case "graph":
        updateHistory(position, command, <Graph />);
        break;
      default:
        updateHistory(
          position,
          command,
          <>
            <p>Command not found: {command}</p>
            <p>Try: posts, about, contact</p>
          </>,
        );
    }
  }

  return (
    <div className="p-2">
      {panes[position].history?.map((item, idx) => (
        <div key={idx}>
          <div>$ {item.command}</div>
          <div>{item.output}</div>
          <br />
        </div>
      ))}
      <TerminalInput inputRef={inputRef} onSubmit={executeCommand} />
    </div>
  );
}
