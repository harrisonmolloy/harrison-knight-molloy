"use client";

import { usePanes } from "hooks/usePanes";

type PaneContainerPropTypes = {
  children: React.ReactNode;
  paneId: number;
};

export function PaneContainer({ children, paneId }: PaneContainerPropTypes) {
  const { panes, getActivePaneId, setActivePane } = usePanes();
  const { isOpen, isActive } = panes[paneId];

  const borderStyles = `
  border border-light-fg dark:border-dark-fg ${paneId < getActivePaneId() && "border-b-0 md:border md:border-r-0"} ${paneId > getActivePaneId() && "border-t-0 md:border md:border-l-0"}`;

  return (
    <section
      onClick={() => setActivePane(paneId)}
      onMouseOver={() => setActivePane(paneId)}
      className={`flex flex-col overflow-hidden border border-light-fg transition duration-500 ease-in-out dark:border-dark-fg ${borderStyles} ${isOpen && "flex-1"} ${!isActive && "opacity-55"}`}
    >
      {children}
    </section>
  );
}
