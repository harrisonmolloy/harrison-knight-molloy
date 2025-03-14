"use client";

import { useRef, useEffect } from "react";
import { ReactElement } from "react";
import { TerminalInput } from "components/client/TerminalInput";
import { PaneType } from "components/client/PaneManager";
import { PostList } from "components/client/PostList";
import { Graph } from "./Graph";

type ShellProps = {
  onExit: (position: number) => void;
  position: number;
  panes: PaneType[];
  setPanes: (panes: PaneType[]) => void;
  isActive: boolean;
};

export function Shell({ position, panes, setPanes, isActive }: ShellProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]); // Focus only when isActive changes

  function updateHistory(command: string, output: ReactElement) {
    const history = panes[position].history;
    if (history != null) {
      const panesCopy = panes.slice();
      panesCopy[position].history = [...history, { command, output }];
      setPanes(panesCopy);
    }
  }

  function clearHistory() {
    const history = panes[position].history;
    if (history != null) {
      const panesCopy = panes.slice();
      panesCopy[position].history = [];
      setPanes(panesCopy);
    }
  }

  function exit() {
    setPanes([...panes.slice(0, position), ...panes.slice(position + 1)]);
  }

  async function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        updateHistory(
          command,
          <p>Available commands: posts, about, contact</p>,
        );
        break;
      case "exit":
        exit();
        break;
      case "clear":
        clearHistory();
        break;
      case "posts":
        updateHistory(command, <PostList />);
        break;
      case "graph":
        updateHistory(command, <Graph />);
        break;
      default:
        updateHistory(
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
