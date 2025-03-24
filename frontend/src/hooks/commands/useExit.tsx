import { useShell } from "hooks/useShell";

export const useExit = (paneId: number) => {
  const { removePane } = useShell(paneId);

  const exit = () => {
    removePane();
    return 1;
  };

  return { exit };
};
