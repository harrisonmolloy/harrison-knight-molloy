import { useState } from "react";

export function useHistory() {
  const [history, setHistory] = useState<React.ReactElement[]>([]);

  function appendHistory(...elements: React.ReactElement[]) {
    setHistory((previousHistory) => [...previousHistory, ...elements]);
  }

  function historyPop() {
    setHistory((previousHistory) => previousHistory.slice(0, -1));
  }

  function clearHistory() {
    setHistory([]);
  }

  return { history, appendHistory, historyPop, clearHistory };
}
