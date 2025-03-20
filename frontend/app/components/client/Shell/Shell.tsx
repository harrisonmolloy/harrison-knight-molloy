"use client";

import { useEffect, useRef } from "react";

import { ShellInput } from "./ShellInput";
import { ShellOutput } from "./ShellOutput";
import { ShellContainer } from "./ShellContainer";

import { PostList } from "./commands/Posts/PostList";
import { Graph } from "components/client/Graph/Graph";

import { ascii } from "lib/ascii";
import { getConfig } from "lib/getFunctions";

import { panesAtom } from "store/atoms";
import { useAtomValue } from "jotai";
import { useSetImmerAtom } from "jotai-immer";

type ShellPropTypes = {
  paneId: number;
};

export function Shell({ paneId }: ShellPropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    isActive,
    isOpen,
    startUpCommands = [],
    history,
  } = useAtomValue(panesAtom)[paneId];
  const setPanes = useSetImmerAtom(panesAtom);

  const appendHistory = (...elements: React.ReactElement[]) => {
    setPanes((draft) => {
      draft[paneId].history.push(...elements);
    });
  };

  const clearHistory = () => {
    setPanes((draft) => {
      draft[paneId].history = [];
    });
  };

  const removePane = () => {
    setPanes((draft) => {
      draft.splice(paneId, 1);
    });
  };

  // Focus input when shell becomes active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Handle startup commands
  useEffect(() => {
    for (const command of startUpCommands) {
      executeCommand(command);
    }
  }, []);

  async function executeCommand(command: string) {
    switch (command.toLowerCase()) {
      case "help":
        appendHistory(
          <p>$ {command}</p>,
          <p>Available commands: graph, posts, about, contact, exit, clear</p>,
        );
        break;

      case "exit":
        removePane();
        break;

      case "clear":
      case "clr":
        clearHistory();
        break;

      case "posts":
        appendHistory(<p>$ {command}</p>, <PostList />);
        break;

      case "graph":
        appendHistory(
          <p>$ {command}</p>,
          <Graph paneId={paneId} inline={true} />,
        );
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
          <p>Command not found: {command}</p>,
          <p>Try: graph, posts, about, contact, exit, clear</p>,
        );
    }
  }

  return (
    <ShellContainer isOpen={isOpen}>
      <ShellOutput history={history} />
      <ShellInput inputRef={inputRef} onSubmit={executeCommand} />
    </ShellContainer>
  );
}
