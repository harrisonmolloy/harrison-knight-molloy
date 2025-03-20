"use client";

import { Pane } from "components/client/PaneManager/Pane";
import { AddPaneButton } from "components/client/PaneManager/AddPaneButton";

import { useAtomValue } from "jotai";
import { panesAtom } from "store/atoms";

export function PaneManager() {
  const panes = useAtomValue(panesAtom);

  return (
    <>
      {panes.map((pane, id) => (
        <Pane key={id} paneId={id} />
      ))}
      <AddPaneButton />
    </>
  );
}
