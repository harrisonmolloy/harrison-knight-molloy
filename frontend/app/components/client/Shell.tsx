"use client";

import { useRef, useEffect, ReactElement } from "react";
import { ascii } from "lib/ascii";
import { getConfig } from "lib/getFunctions";
import { TerminalInput } from "components/client/TerminalInput";
import { PostList } from "components/client/PostList";
import { Graph } from "components/client/Graph";

type ShellProps = {
  panePosition: number;
  isActive: boolean;
  history: ReactElement[];
  onExit: (position: number) => void;
  clearHistory: (position: number) => void;
  historyPush: (position: number, ...elements: ReactElement[]) => void;
};

export function Shell({
  panePosition,
  isActive,
  history,
  onExit,
  clearHistory,
  historyPush,
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
        historyPush(
          panePosition,
          <p>$ {command}</p>,
          <p>Available commands: graph, posts, about, contact, exit, clear</p>,
        );
        break;

      case "exit":
        onExit(panePosition);
        break;

      case "clear":
      case "clr":
        clearHistory(panePosition);
        break;

      case "posts":
        historyPush(panePosition, <p>$ {command}</p>, <PostList />);
        break;

      case "graph":
        historyPush(panePosition, <p>$ {command}</p>, <Graph />);
        break;

      case "contact":
        historyPush(
          panePosition,
          <p>$ {command}</p>,
          <p>mail@harriknight.com</p>,
        );
        break;

      case "about":
        const config = await getConfig();
        historyPush(
          panePosition,
          <p>$ {command}</p>,
          <div className="flex">
            <pre className="text-[5px] leading-[3px]">{ascii}</pre>
            <div className="ml-1">
              <p>Title: {config?.title}</p>
              <p>Description: {config?.description}</p>
            </div>
          </div>,
        );
        break;

      default:
        historyPush(
          panePosition,
          <p>$ {command}</p>,
          <>
            <p>Command not found: {command}</p>
            <p>Try: graph, posts, about, contact, exit, clear</p>
          </>,
        );
    }
  }

  return (
    <div className="p-2">
      {...history}
      <TerminalInput inputRef={inputRef} onSubmit={executeCommand} />
    </div>
  );
}
