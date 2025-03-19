"use client";

import { Pane } from "components/client/PaneManager/Pane";
import { AddPaneButton } from "components/client/PaneManager/AddPaneButton";

import { usePaneManager } from "hooks/usePaneManager";

import { PaneType } from "types/paneType";

type PaneManagerPropTypes = {
  initialPanes: PaneType[];
};

export function PaneManager({ initialPanes }: PaneManagerPropTypes) {
  const { panes, removePane, appendPane, togglePane, setActivePane } =
    usePaneManager(initialPanes);

  return (
    <>
      {panes.map((pane, id) => (
        <Pane
          key={id}
          id={id}
          title={pane.title}
          type={pane.type}
          isOpen={pane.isOpen}
          isActive={pane.isActive}
          onToggle={() => togglePane(id)}
          onExit={() => removePane(id)}
          onClick={() => setActivePane(id)}
          startUpCommands={pane.startUpCommands}
        />
      ))}
      <AddPaneButton onClick={appendPane} />
    </>
  );
}
