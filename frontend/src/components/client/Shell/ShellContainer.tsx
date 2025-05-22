import { usePanes } from "hooks/usePanes";

type ShellContainerPropTypes = {
  children: React.ReactNode;
  paneId: number;
};

export function ShellContainer({ children, paneId }: ShellContainerPropTypes) {
  const { panes } = usePanes();
  const { isOpen } = panes[paneId];

  return (
    <div className={isOpen ? "" : "h-0 w-0 overflow-hidden"}>{children}</div>
  );
}
