"use client";

import { PaneContainer } from "components/client/PaneManager/PaneContainer";
import { PaneTitle } from "components/client/PaneManager/PaneTitle";
import { PaneContentContainer } from "components/client/PaneManager/PaneContentContainer";
import { PaneContent } from "components/client/PaneManager/PaneContent";

type PanePropTypes = {
  id: number;
  title: string;
  type: string;
  isActive: boolean;
  isOpen: boolean;
  onExit: () => void;
  onToggle: () => void;
  onClick: () => void;
  startUpCommands?: string[];
};

export function Pane({
  id,
  title,
  type,
  isActive,
  isOpen,
  startUpCommands,
  onToggle,
  onExit,
  onClick,
}: PanePropTypes) {
  return (
    <PaneContainer id={id} isOpen={isOpen} onClick={onClick}>
      <PaneTitle
        title={title}
        isOpen={isOpen}
        onClick={onToggle}
        onXClick={onExit}
      />
      <PaneContentContainer>
        <PaneContent
          type={type}
          isActive={isActive}
          isOpen={isOpen}
          onExit={onExit}
          startUpCommands={startUpCommands}
        />
      </PaneContentContainer>
    </PaneContainer>
  );
}
