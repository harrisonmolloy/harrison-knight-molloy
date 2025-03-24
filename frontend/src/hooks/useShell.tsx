import { useSetImmerAtom } from "jotai-immer";
import { panesAtom } from "store/atoms";
import { usePanes } from "hooks/usePanes";
import { Spinner } from "components/Spinner";

export const useShell = (paneId: number) => {
  const {
    panes,
    togglePane: togglePaneId,
    removePane: removePaneId,
    clearHistory: clearHistoryId,
    appendPane,
  } = usePanes();
  const setPanes = useSetImmerAtom(panesAtom);

  const printLine = (...elements: React.ReactNode[]) => {
    setPanes((draft) => {
      draft[paneId].history.push(...elements);
    });
  };

  const printCommand = (command: string) => {
    setPanes((draft) => {
      draft[paneId].history.push(`$ ${command}`);
    });
  };

  const printLineBreak = () => {
    setPanes((draft) => {
      draft[paneId].history.push(<br />);
    });
  };

  const showSpinner = (message?: string) => {
    setPanes((draft) => {
      draft[paneId].history.push(<Spinner message={message} />);
    });
  };

  const popLine = (n = 1) => {
    setPanes((draft) => {
      while (n > 0) {
        draft[paneId].history.pop();
        n--;
      }
    });
  };

  const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const togglePane = () => {
    togglePaneId(paneId);
  };

  const removePane = () => {
    removePaneId(paneId);
  };

  const clearHistory = async () => {
    const historyLength = panes[paneId].history.length;

    for (let i = 0; i <= historyLength; i++) {
      showSpinner("clearing history");
      await delay(10);
      popLine(2);
    }
  };

  return {
    printLine,
    printCommand,
    printLineBreak,
    showSpinner,
    popLine,
    togglePane,
    togglePaneId,
    removePane,
    removePaneId,
    clearHistory,
    clearHistoryId,
    appendPane,
    delay,
  };
};
