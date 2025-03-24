"use client";

import { Plus } from "lucide-react";

import { usePanes } from "hooks/usePanes";

export function AddPaneButton() {
  const { appendPane } = usePanes();

  return (
    <button
      onClick={() => appendPane()}
      className="absolute right-0 z-10 border bg-light-bg p-2 md:bottom-0 dark:bg-dark-bg"
    >
      <Plus size={16} strokeWidth={1.75} />
    </button>
  );
}
