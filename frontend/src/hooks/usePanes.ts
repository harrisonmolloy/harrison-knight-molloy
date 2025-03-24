import { useImmerAtom } from "jotai-immer";
import { createElement } from "react";
import { DEFAULT_PANE, panesAtom } from "store/atoms";

export const usePanes = () => {
  const [panes, setPanes] = useImmerAtom(panesAtom);

  const appendHistory = (paneId: number, ...elements: React.ReactNode[]) => {
    setPanes((draft) => {
      draft[paneId].history.push(...elements);
    });
  };

  const printCommand = (paneId: number, command: string) => {
    setPanes((draft) => {
      draft[paneId].history.push(`$ ${command}`);
    });
  };

  const printLineBreak = (paneId: number) => {
    setPanes((draft) => {
      draft[paneId].history.push(createElement("br"));
    });
  };

  const popHistory = (paneId: number) => {
    setPanes((draft) => {
      draft[paneId].history.pop();
    });
  };

  const clearHistory = (paneId: number) => {
    setPanes((draft) => {
      draft[paneId].history = [];
    });
  };

  const appendPane = (pane = DEFAULT_PANE) => {
    setPanes((draft) => {
      draft.push(pane);
      // set all panes to inactive
      // set new pane to active
    });
  };

  const shiftCommand = (paneId: number) => {
    const command = panes[paneId].commandQueue[0];
    setPanes((draft) => {
      draft[paneId].commandQueue.shift();
    });
    return command;
  };

  const appendCommand = (paneId: number, command: string) => {
    setPanes((draft) => {
      draft[paneId].commandQueue.push(command);
    });
  };

  const removePane = (paneId: number) => {
    setPanes((draft) => {
      draft.splice(paneId, 1);
    });
  };

  const togglePane = (paneId: number) => {
    setPanes((draft) => {
      // toggle pane
      draft[paneId].isOpen = !draft[paneId].isOpen;

      // if on mobile close all other panes

      // ?
      // if closing
      // set active pane to next pane
      // if no next pane set it to first pane
    });
  };

  const getActivePaneId = () => {
    return panes.findIndex((pane) => pane.isActive);
  };

  const setActivePane = (paneId: number) => {
    setPanes((draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].isActive = i === paneId;
      }
    });
  };

  return {
    panes,
    getActivePaneId,
    clearHistory,
    removePane,
    appendPane,
    togglePane,
    appendHistory,
    printCommand,
    printLineBreak,
    popHistory,
    setActivePane,
    appendCommand,
    shiftCommand,
  };
};
