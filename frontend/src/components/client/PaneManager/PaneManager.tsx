"use client";

import { Pane } from "./Pane";
import { AddPaneButton } from "./AddPaneButton";

import { usePanes } from "hooks/usePanes";

export function PaneManager() {
  const { panes } = usePanes();

  return (
    <>
      {panes.map((pane, id) => (
        <Pane key={id} paneId={id} />
      ))}
      <AddPaneButton />
    </>
  );
}
