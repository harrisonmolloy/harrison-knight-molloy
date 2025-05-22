"use client";

import { PaneContainer } from "./PaneContainer";
import { PaneHeader } from "./PaneHeader";
import { PaneContentContainer } from "./PaneContentContainer";
import { PaneContent } from "./PaneContent";
import { useRef } from "react";

type PanePropTypes = {
  paneId: number;
};

export function Pane({ paneId }: PanePropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <PaneContainer paneId={paneId}>
      <PaneHeader paneId={paneId} />
      <PaneContentContainer paneId={paneId} inputRef={inputRef}>
        <PaneContent paneId={paneId} inputRef={inputRef} />
      </PaneContentContainer>
    </PaneContainer>
  );
}
