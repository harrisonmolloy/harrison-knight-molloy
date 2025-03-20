"use client";

import { Pane } from "components/client/PaneManager/Pane";
import { AddPaneButton } from "components/client/PaneManager/AddPaneButton";

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
