"use client";

import { X } from "lucide-react";

import { useImmerAtom } from "jotai-immer";
import { panesAtom } from "store/atoms";

export type PaneHeaderPropTypes = {
  paneId: number;
};

export function PaneHeader({ paneId }: PaneHeaderPropTypes) {
  const [panes, setPanes] = useImmerAtom(panesAtom);

  const togglePane = () => {
    setPanes((draft) => {
      draft[paneId].isOpen = !draft[paneId].isOpen;
    });
  };

  const removePane = () => {
    setPanes((draft) => {
      draft.splice(paneId, 1);
    });
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        togglePane();
      }}
      className={`z-1 flex cursor-pointer p-2 ${panes[paneId].isOpen || "md:h-full md:[writing-mode:vertical-lr]"}`}
    >
      <h1>{panes[paneId].title}</h1>
      <div className="flex-1"></div>
      <button
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          removePane();
        }}
      >
        <X size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}
