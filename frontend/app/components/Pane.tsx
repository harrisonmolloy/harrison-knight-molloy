"use client";

import { useState } from "react";
import { X } from "lucide-react";

export function Pane({
  children,
  title,
  initOpen = true,
}: {
  children: React.ReactNode;
  title: string;
  initOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initOpen);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  if (isOpen) {
    return (
      <section className="flex flex-1 flex-col overflow-hidden">
        <button className="z-1 flex p-2">
          <h1>{title}</h1>
          <div className="flex-1"></div>
          <X size={16} strokeWidth={1.75} onClick={handleClick} />
        </button>
        <div className="flex flex-1 flex-col overflow-y-scroll">{children}</div>
      </section>
    );
  }
  return (
    <section className="flex flex-col overflow-hidden" onClick={handleClick}>
      <button className="z-1 flex p-2 md:[writing-mode:vertical-lr]">
        <h1>{title}</h1>
      </button>
    </section>
  );
}
