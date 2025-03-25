import { atom } from "jotai";

import { PaneType } from "types/paneType";

export const DEFAULT_PANE = {
  title: "/shell",
  isOpen: true,
  isActive: false,
  type: "shell",
  history: [],
  commandQueue: [],
};

export const INITIAL_PANES: PaneType[] = [
  {
    title: "/shell/help",
    isOpen: false,
    isActive: true,
    type: "shell",
    commandQueue: ["help"],
    history: [],
  },
  {
    title: "graph",
    isOpen: true,
    isActive: false,
    type: "graph",
    commandQueue: ["posts"],
    history: [],
  },
];

export const panesAtom = atom<PaneType[]>(INITIAL_PANES);
