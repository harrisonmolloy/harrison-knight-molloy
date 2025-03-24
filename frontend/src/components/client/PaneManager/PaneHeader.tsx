"use client";

import { X } from "lucide-react";

import { usePanes } from "hooks/usePanes";

export type PaneHeaderPropTypes = {
  paneId: number;
};

export function PaneHeader({ paneId }: PaneHeaderPropTypes) {
  const { panes, togglePane, removePane } = usePanes();
  const { isOpen, title } = panes[paneId];

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        togglePane(paneId);
      }}
      className={`z-1 flex cursor-pointer p-2 ${isOpen || "md:h-full md:[writing-mode:vertical-lr]"}`}
    >
      <h1>{title}</h1>
      <div className="flex-1"></div>
      <button
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          removePane(paneId);
        }}
      >
        <X size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}
