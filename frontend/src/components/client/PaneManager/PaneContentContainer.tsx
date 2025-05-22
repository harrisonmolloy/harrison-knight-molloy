"use client";

import { usePanes } from "hooks/usePanes";

export type PaneContentContainerPropTypes = {
  children: React.ReactNode;
  paneId: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function PaneContentContainer({
  children,
  paneId,
  inputRef,
}: PaneContentContainerPropTypes) {
  const { panes } = usePanes();
  const { isOpen } = panes[paneId];

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex flex-1 flex-col overflow-y-scroll ${isOpen && "p-2"}`}
    >
      {children}
    </div>
  );
}
