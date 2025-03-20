import { atom } from "jotai";

import { PaneType } from "types/paneType";

export const DEFAULT_PANE = {
  title: "/",
  isOpen: true,
  isActive: false,
  type: "shell",
  history: [],
};

export const INITIAL_PANES: PaneType[] = [
  {
    title: "/harriknight/graph",
    isOpen: true,
    isActive: true,
    type: "shell",
    startUpCommands: ["graph", "help"],
    history: [],
  },
  {
    title: "harriknight/all-posts",
    isOpen: true,
    isActive: false,
    type: "shell",
    startUpCommands: ["posts"],
    history: [],
  },
];

export const panesAtom = atom<PaneType[]>(INITIAL_PANES);
