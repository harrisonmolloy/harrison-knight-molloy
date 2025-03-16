"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { Shell } from "components/client/Shell";

export type PaneType = {
  title: string;
  isOpen: boolean;
  type: string;
  history?: {
    command: string;
    output: React.ReactElement;
  }[];
};

export function PaneManager() {
  const [panes, setPanes] = useState<PaneType[]>([
    {
      title: "/",
      isOpen: true,
      type: "shell",
      history: [],
    },
  ]);
  const [activePaneIndex, setActivePaneIndex] = useState(0);

  function removePane(position: number) {
    // need to fix this logic, slice only shallow copies the array
    //
    // deepclone array?
    // use splice (not slice) to remove array
    // return new deepcloned/spliced array
    //
    // use .map + spread to create new array
    // 
    // also should reset the position here?
    // 
    // keep positon as part of the pane logic/state
    setPanes([...panes.slice(0, position), ...panes.slice(position + 1)]);
  }

  function appendPane() {
    const newPane = {
      title: "/",
      isOpen: true,
      type: "shell",
      history: [],
    };
    setPanes([...panes, newPane]);
  }

  function togglePane(position: number) {
    const panesCopy = panes.slice();
    panesCopy[position].isOpen = !panes[position].isOpen;
    setPanes(panesCopy);
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
              setPanes={setPanes}
              isActive={activePaneIndex === id}
            />
          )}
        </Pane>
      ))}
      <button
        className="absolute z-10 border bg-light-bg p-2 max-md:right-0 md:bottom-0 md:left-0 dark:bg-dark-bg"
        onClick={appendPane}
      >
        <Plus size={16} strokeWidth={1.75} />
      </button>
    </>
  );
}
