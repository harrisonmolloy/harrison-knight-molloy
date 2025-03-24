import { useShell } from "hooks/useShell";

export const useClear = (paneId: number) => {
  const { clearHistory } = useShell(paneId);

  const clear = () => {
    clearHistory();
    return 1;
  };

  return { clear };
};
