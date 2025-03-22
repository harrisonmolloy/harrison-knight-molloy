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
  const { panes } = usePanes();
  const { isActive } = panes[paneId];

  // Focus input when shell becomes active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  // Add a click handler to the container
  const handleContainerClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  };

  return (
    <ShellContainer paneId={paneId} onClick={handleContainerClick}>
      <ShellOutput paneId={paneId} />
      <ShellInput paneId={paneId} inputRef={inputRef} />
    </ShellContainer>
  );
}
