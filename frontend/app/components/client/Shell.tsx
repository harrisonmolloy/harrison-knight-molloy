"use client";

import { useRef, useEffect, useState } from "react";
import { ascii } from "lib/ascii";
import { getConfig } from "lib/getFunctions";
import { TerminalInput } from "components/client/TerminalInput";
import { PostList } from "components/client/PostList";
import { Graph } from "components/client/Graph";

type ShellProps = {
  isActive: boolean;
  onExit: () => void;
  startUpCommands: string[];
};

export function Shell({ isActive, onExit, startUpCommands }: ShellProps) {
  const [history, setHistory] = useState<React.ReactElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        appendHistory(
          <p>$ {command}</p>,
          <p>Available commands: graph, posts, about, contact, exit, clear</p>,
        );
        break;

      case "exit":
        onExit();
        break;

      case "clear":
      case "clr":
        clearHistory();
        break;

      case "posts":
        appendHistory(<p>$ {command}</p>, <PostList />);
        break;

      case "graph":
        appendHistory(<p>$ {command}</p>, <Graph />);
        break;

      case "contact":
        appendHistory(<p>$ {command}</p>, <p>mail@harriknight.com</p>);
        break;

      case "about":
        const config = await getConfig();
        appendHistory(
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
        appendHistory(
          <p>$ {command}</p>,
          <>
            <p>Command not found: {command}</p>
            <p>Try: graph, posts, about, contact, exit, clear</p>
          </>,
        );
    }
  }

  function initHistory() {
    for (const command of startUpCommands) {
      executeCommand(command);
    }
  }

  // Init history with startup Commands
  useEffect(() => {
    initHistory();
  }, []);

  // Focus input when isActive changes
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  function appendHistory(...elements: React.ReactElement[]) {
    setHistory((previousHistory) => [...previousHistory, ...elements]);
  }

  // function historyPop() {
  //   setHistory(previousHistory => previousHistory.slice(0, -1));
  // }

  function clearHistory() {
    setHistory([]);
  }

  function handleSubmit(command: string) {
    executeCommand(command);
  }

  return (
    <div className="p-2">
      {history}
      <TerminalInput inputRef={inputRef} onSubmit={handleSubmit} />
    </div>
  );
}
