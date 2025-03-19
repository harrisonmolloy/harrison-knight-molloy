"use client";

export type PaneContentContainerPropTypes = {
  children: React.ReactNode;
};

export function PaneContentContainer({
  children,
}: PaneContentContainerPropTypes) {

  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">{children}</div>
  );

}
