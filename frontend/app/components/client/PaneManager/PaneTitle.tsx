"use client";

import { X } from "lucide-react";

export type PaneTitlePropTypes = {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  onXClick: () => void;
};

export function PaneTitle({
  title,
  isOpen,
  onClick,
  onXClick,
}: PaneTitlePropTypes) {
  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onClick();
  }

  function handleXClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onXClick();
  }

  return (
    <div
      onClick={handleClick}
      className={`z-1 flex p-2 cursor-pointer ${isOpen || "md:h-full md:[writing-mode:vertical-lr]"}`}
    >
      <h1>{title}</h1>
      <div className="flex-1"></div>
      <button className="cursor-pointer" onClick={handleXClick}>
        <X size={16} strokeWidth={1.75} />
      </button>
    </div>
  );
}
