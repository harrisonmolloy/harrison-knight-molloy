"use client";

import { useImmerAtom } from "jotai-immer";
import { panesAtom } from "store/atoms";

type PaneContainerPropTypes = {
  children: React.ReactNode;
  paneId: number;
};

export function PaneContainer({ children, paneId }: PaneContainerPropTypes) {
  const [panes, setPanes] = useImmerAtom(panesAtom);

  const setActivePane = () => {
    setPanes((draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].isActive = i === paneId;
      }
    });
  };

  return (
    <section
      onClick={setActivePane}
      className={`flex ${panes[paneId].isOpen && "flex-1"} flex-col overflow-hidden border border-light-fg dark:border-dark-fg ${paneId && "border-t-0 md:border md:border-l-0"}`}
    >
      {children}
    </section>
  );
}
