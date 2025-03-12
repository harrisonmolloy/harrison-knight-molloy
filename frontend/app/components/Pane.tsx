"use client";

import { useState } from "react";

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
        <button className="z-1 flex p-2" onClick={handleClick}>
          <h1>{title}</h1>
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
