"use client";

import { useEffect, useRef } from "react";
import { usePanes } from "hooks/usePanes";

export type PaneContentContainerPropTypes = {
  children: React.ReactNode;
  paneId: number;
};

export function PaneContentContainer({
  children,
  paneId,
}: PaneContentContainerPropTypes) {
  const ref = useRef<HTMLDivElement>(null);

  const { panes } = usePanes();
  const { isOpen } = panes[paneId];

  // match terminal style auto scroll behaviour
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [panes]);

  return (
    <div
      ref={ref}
      className={`flex flex-1 flex-col overflow-y-scroll ${isOpen && "p-2"}`}
    >
      {children}
    </div>
  );
}
