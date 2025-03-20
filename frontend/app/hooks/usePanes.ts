import { useImmerAtom } from "jotai-immer";
import { DEFAULT_PANE, panesAtom } from "store/atoms";

export const usePanes = () => {
  const [panes, setPanes] = useImmerAtom(panesAtom);

  const appendHistory = (paneId: number, ...elements: React.ReactElement[]) => {
    setPanes((draft) => {
      draft[paneId].history.push(...elements);
    });
  };

  const clearHistory = (paneId: number) => {
    setPanes((draft) => {
      draft[paneId].history = [];
    });
  };

  const appendPane = () => {
    setPanes((draft) => {
      draft.push(DEFAULT_PANE);
      // set all panes to inactive
      // set new pane to active
    });
  };

  const removePane = (paneId: number) => {
    setPanes((draft) => {
      draft.splice(paneId, 1);
    });
  };

  const togglePane = (paneId: number) => {
    setPanes((draft) => {
      draft[paneId].isOpen = !draft[paneId].isOpen;

      // if on mobile close all other panes

      // ?
      // if closing
      // set active pane to next pane
      // if no next pane set it to first pane
    });
  };

  const activePaneId = panes.findIndex((pane) => pane.isActive);

  const setActivePane = (paneId: number) => {
    setPanes((draft) => {
      for (let i = 0; i < draft.length; i++) {
        draft[i].isActive = i === paneId;
      }
    });
  };

  return {
    panes,
    activePaneId,
    clearHistory,
    removePane,
    appendPane,
    togglePane,
    appendHistory,
    setActivePane,
  };
};
