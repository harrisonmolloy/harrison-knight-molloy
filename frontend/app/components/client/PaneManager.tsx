"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { Shell } from "components/client/Shell";

interface Pane {
  title: string;
  isOpen: boolean;
  content: React.JSX.Element;
}

export function PaneManager() {
  const [panes, setPanes] = useState<Pane[]>([
    {
      title: "/Graph",
      isOpen: true,
      content: <Graph />,
    },
    {
      title: "/",
      isOpen: false,
      content: <Shell onExit={removePane} />,
    },
  ]);

  function removePane(position: number) {
    setPanes([...panes.slice(0, position), ...panes.slice(position + 1)]);
  }

  function appendPane(pane: Pane) {
    setPanes([...panes, pane]);
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
          onClosedClick={handleClosedClick}
        >
          {pane.content}
        </Pane>
      ))}
      <button
        className="absolute z-10 border bg-light-bg p-2 max-md:right-0 md:bottom-0 md:left-0 dark:bg-dark-bg"
        onClick={() =>
          appendPane({
            title: "/",
            isOpen: false,
            content: <Shell onExit={removePane} />,
          })
        }
      >
        <Plus size={16} strokeWidth={1.75} />
      </button>
    </>
  );
}
