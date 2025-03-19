"use client";

import { Plus } from "lucide-react";

export function AddPaneButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 border bg-light-bg p-2 md:bottom-0 dark:bg-dark-bg"
    >
      <Plus size={16} strokeWidth={1.75} />
    </button>
  );
}
