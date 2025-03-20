"use client";

import { PaneContainer } from "./PaneContainer";
import { PaneHeader } from "./PaneHeader";
import { PaneContentContainer } from "./PaneContentContainer";
import { PaneContent } from "./PaneContent";

type PanePropTypes = {
  paneId: number;
};

export function Pane({ paneId }: PanePropTypes) {
  return (
    <PaneContainer paneId={paneId}>
      <PaneHeader paneId={paneId} />
      <PaneContentContainer>
        <PaneContent paneId={paneId} />
      </PaneContentContainer>
    </PaneContainer>
  );
}
