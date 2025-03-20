import { useAtom } from "jotai";
import { panesAtom } from "store/atoms";

export function useHistory(id: number) {
  const [panes, setPanes] = useAtom(panesAtom);

  const appendHistory = (...elements: React.ReactElement[]) => {
    setPanes((draft) => {
      draft[id].history.push(...elements);
    });
  };

  const historyPop = () => {
    setPanes((draft) => {
      draft[id].history.pop();
    });
  };

  const clearHistory = () => {
    setPanes((draft) => {
      draft[id].history = [];
    });
  };

  const history = panes[id].history;

  return { history, appendHistory, historyPop, clearHistory };
}
