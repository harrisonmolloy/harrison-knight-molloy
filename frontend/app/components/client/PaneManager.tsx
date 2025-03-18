"use client";

import { useState } from "react";
import { produce } from "immer";
import { Plus } from "lucide-react";
import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { Shell } from "components/client/Shell";

type PaneManagerProps = {
  initialPanes: PaneType[];
};

export type PaneType = {
  title: string;
  isOpen: boolean;
  type: string;
  startUpCommands: string[];
};

export function PaneManager({ initialPanes }: PaneManagerProps) {
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
        startUpCommands: [],
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
              startUpCommands={pane.startUpCommands}
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
