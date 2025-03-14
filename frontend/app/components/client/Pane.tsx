"use client";
import { X } from "lucide-react";

type PaneProps = {
  children: React.ReactNode;
  title: string;
  isOpen?: boolean;
  position: number;
  onXClick(position: number): void;
  onClosedClick(position: number): void;
  onTitleClick(position: number): void;
};

export function Pane({
  children,
  title,
  isOpen = true,
  position,
  onXClick,
  onTitleClick,
}: PaneProps) {
  function handleXClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onXClick(position);
  }

  function handleTitleClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    onTitleClick(position);
  }

  if (isOpen) {
    return (
      <section
        className={`flex flex-1 flex-col overflow-hidden border border-light-fg dark:border-dark-fg ${position == 0 ? "" : "border-t-0 md:border md:border-l-0"}`}
      >
        <div onClick={handleTitleClick} className="z-1 flex p-2">
          <h1>{title}</h1>
          <div className="flex-1"></div>
          <button onClick={handleXClick}>
            <X size={16} strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-y-scroll">{children}</div>
      </section>
    );
  }
  return (
    <section
      className={`flex flex-col overflow-hidden border border-light-fg dark:border-dark-fg ${position == 0 ? "" : "border-t-0 md:border md:border-l-0"}`}
    >
      <div
        onClick={handleTitleClick}
        className="al z-1 flex p-2 md:h-full md:[writing-mode:vertical-lr]"
      >
        <h1>{title}</h1>
        <div className="flex-1"></div>
        <button onClick={() => onXClick(position)}>
          <X size={16} strokeWidth={1.75} />
        </button>
      </div>
    </section>
  );
}
