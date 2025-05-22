"use client";

import { ShellInput } from "./ShellInput";
import { ShellOutput } from "./ShellOutput";
import { ShellContainer } from "./ShellContainer";

type ShellPropTypes = {
  paneId: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

export function Shell({ paneId, inputRef }: ShellPropTypes) {
  return (
    <ShellContainer paneId={paneId}>
      <ShellOutput paneId={paneId} />
      <ShellInput paneId={paneId} inputRef={inputRef} />
    </ShellContainer>
  );
}
