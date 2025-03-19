import { produce } from "immer";
import { useCallback, useState } from "react";
import { PaneType } from "types/paneType";

export function usePaneManager(initialPanes: PaneType[]) {
  const [panes, setPanes] = useState<PaneType[]>(initialPanes);

  const removePane = useCallback(
    (id: number) => {
      const nextPanes = produce(panes, (draft) => {
        draft.splice(id, 1);
      });
      setPanes(nextPanes);
    },
    [panes],
  );

  const appendPane = useCallback(() => {
    const nextPanes = produce(panes, (draft) => {
      draft.push({
        title: "/",
        isOpen: true,
        isActive: false,
        type: "shell",
      });
    });
    setPanes(nextPanes);
  }, [panes]);

  const togglePane = useCallback(
    (id: number) => {
      const nextPanes = produce(panes, (draft) => {
        draft[id].isOpen = !draft[id].isOpen;
      });
      setPanes(nextPanes);
    },
    [panes],
  );

  const setActivePane = useCallback(
    (id: number) => {
      const nextPanes = produce(panes, (draft) => {
        for (let i = 0; i < draft.length; i++) {
          draft[i].isActive = i === id;
        }
      });
      setPanes(nextPanes);
    },
    [panes],
  );

  return {
    panes,
    removePane,
    appendPane,
    togglePane,
    setActivePane,
  };
}
