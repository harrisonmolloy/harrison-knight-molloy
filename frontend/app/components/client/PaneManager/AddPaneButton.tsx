"use client";

import { Plus } from "lucide-react";

import { useSetImmerAtom } from "jotai-immer";
import { DEFAULT_PANE, panesAtom } from "store/atoms";

export function AddPaneButton() {
  const setPanes = useSetImmerAtom(panesAtom);

  const appendPane = () => {
    setPanes((draft) => {
      draft.push(DEFAULT_PANE);
    });
  };

  return (
    <button
      onClick={appendPane}
      className="absolute right-0 z-10 border bg-light-bg p-2 md:bottom-0 dark:bg-dark-bg"
    >
      <Plus size={16} strokeWidth={1.75} />
    </button>
  );
}
