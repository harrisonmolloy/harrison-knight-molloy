"use client";

type PaneContainerPropTypes = {
  children: React.ReactNode;
  id: number;
  isOpen: boolean;
  onClick: () => void;
};

export function PaneContainer({
  children,
  id,
  isOpen,
  onClick,
}: PaneContainerPropTypes) {
  return (
    <section
      onClick={onClick}
      className={`flex ${isOpen && "flex-1"} flex-col overflow-hidden border border-light-fg dark:border-dark-fg ${id && "border-t-0 md:border md:border-l-0"}`}
    >
      {children}
    </section>
  );
}
