"use client";

import { ReactElement, useState } from "react";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { Shell } from "components/client/Shell";
import { PostList } from "./PostList";

export type PaneType = {
  title: string;
  isOpen: boolean;
  type: string;
  history: {
    command: string;
    output: React.ReactElement;
  }[];
};

export function PaneManager() {
  const [panes, setPanes] = useState<PaneType[]>([
    {
      title: "/harriknight/graph",
      isOpen: true,
      type: "shell",
      history: [
        { command: "graph", output: <Graph /> },
        {
          command: "help",
          output: (
            <>
              <span>Available commands: </span>
              <span className="dark:text-dark-bright-black text-light-bright-black">
                posts, graph, about, contact
              </span>
            </>
          ),
        },
      ],
    },
    {
      title: "harriknight/all-posts",
      isOpen: true,
      type: "shell",
      history: [{ command: "posts", output: <PostList /> }],
    },
  ]);
  const [activePaneIndex, setActivePaneIndex] = useState(0);

  function removePane(position: number) {
    const nextPanes = produce(panes, (draft) => {
      // remove pane at positon
      draft.splice(position, 1);
      // note: when postion moves to state remember to reset the position here.
    });
    setPanes(nextPanes);
  }

  function appendPane() {
    const nextPanes = produce(panes, (draft) => {
      draft.push({
        title: "/",
        isOpen: true,
        type: "shell",
        history: [],
      });
      // note: when postion moves to state remember to add the position here.
    });
    setPanes(nextPanes);
  }

  function togglePane(position: number) {
    const nextPanes = produce(panes, (draft) => {
      draft[position].isOpen = !draft[position].isOpen;
    });
    setPanes(nextPanes);
  }

  function updateHistory(
    position: number,
    command: string,
    output: ReactElement,
  ) {
    const nextPanes = produce(panes, (draft) => {
      draft[position].history.push({ command, output });
    });
    setPanes(nextPanes);
  }

  function clearHistory(position: number) {
    const nextPanes = produce(panes, (draft) => {
      draft[position].history = [];
    });
    setPanes(nextPanes);
  }

  function handleClosedClick(position: number) {
    togglePane(position);
  }

  return (
    <>
      {panes.map((pane, id) => (
        <Pane
          key={id}
          position={id}
          title={pane.title}
          isOpen={pane.isOpen}
          onXClick={removePane}
          onTitleClick={togglePane}
          onClick={() => setActivePaneIndex(id)}
          onClosedClick={handleClosedClick}
        >
          {pane.type == "graph" ? (
            <Graph />
          ) : (
            <Shell
              position={id}
              onExit={removePane}
              panes={panes}
              updateHistory={updateHistory}
              clearHistory={clearHistory}
              isActive={activePaneIndex === id}
            />
          )}
        </Pane>
      ))}
      <button
        className="absolute right-0 z-10 border bg-light-bg p-2 md:bottom-0 dark:bg-dark-bg"
        onClick={appendPane}
      >
        <Plus size={16} strokeWidth={1.75} />
      </button>
    </>
  );
}
