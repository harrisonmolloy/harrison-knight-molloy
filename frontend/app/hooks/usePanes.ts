import { useImmerAtom } from "jotai-immer";
import { panesAtom } from "store/atoms";

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

  const removePane = (paneId: number) => {
    setPanes((draft) => {
      draft.splice(paneId, 1);
    });
  };

  return { panes, clearHistory, removePane, appendHistory };
};
