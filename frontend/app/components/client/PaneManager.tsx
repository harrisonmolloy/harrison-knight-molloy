"use client";

import { useState } from "react";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { Shell } from "components/client/Shell";
import { PostList } from "components/client/PostList";

export type PaneType = {
  title: string;
  isOpen: boolean;
  type: string;
  initialHistory: React.ReactElement[];
};

export function PaneManager() {
  const initialPanes: PaneType[] = [
    {
      title: "/harriknight/graph",
      isOpen: true,
      type: "shell",
      initialHistory: [
        <div key={0}>$ graph</div>,
        <Graph key={1} />,
        <span key={2}>Available commands: </span>,
        <span
          key={3}
          className="dark:text-dark-bright-black text-light-bright-black"
        >
          posts, graph, about, contact
        </span>,
      ],
    },
    {
      title: "harriknight/all-posts",
      isOpen: true,
      type: "shell",
      initialHistory: [<div key={0}>$ posts</div>, <PostList key={1} />],
    },
  ];

  const [panes, setPanes] = useState<PaneType[]>(initialPanes);
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
        initialHistory: [],
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
        >
          {pane.type == "graph" ? (
            <Graph />
          ) : (
            <Shell
              onExit={() => removePane(id)}
              isActive={activePaneIndex === id}
              initialHistory={pane.initialHistory}
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
