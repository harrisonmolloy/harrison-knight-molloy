"use client";

import { useEffect, useRef } from "react";

import { ShellInput } from "./ShellInput";
import { ShellOutput } from "./ShellOutput";
import { ShellContainer } from "./ShellContainer";

import { usePanes } from "hooks/usePanes";

type ShellPropTypes = {
  paneId: number;
};

export function Shell({ paneId }: ShellPropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);
  // const { submitCommand } = useShell()
  const { panes } = usePanes();
  const { isActive } = panes[paneId];

  // Focus input when shell becomes active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // // Handle startup commands
  // useEffect(() => {
  //   for (const command of startUpCommands) {
  //     submitCommand(paneId, command);
  //   }
  // }, []);
  // }

  return (
    <ShellContainer paneId={paneId}>
      <ShellOutput paneId={paneId} />
      <ShellInput paneId={paneId} inputRef={inputRef} />
    </ShellContainer>
  );
}
