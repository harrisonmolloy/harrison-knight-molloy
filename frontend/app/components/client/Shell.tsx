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
  initialHistory: React.ReactElement[];
};

export function Shell({ isActive, onExit, initialHistory }: ShellProps) {
  const [history, setHistory] = useState(initialHistory || []);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]); // Focus only when isActive changes

  function historyPush(...elements: React.ReactElement[]) {
    setHistory((previousHistory) => [...previousHistory, ...elements]);
  }

  // function historyPop() {
  //   setHistory(previousHistory => previousHistory.slice(0, -1));
  // }

  function clearHistory() {
    setHistory([]);
  }

  async function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        historyPush(
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
        historyPush(<p>$ {command}</p>, <PostList />);
        break;

      case "graph":
        historyPush(<p>$ {command}</p>, <Graph />);
        break;

      case "contact":
        historyPush(<p>$ {command}</p>, <p>mail@harriknight.com</p>);
        break;

      case "about":
        const config = await getConfig();
        historyPush(
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
