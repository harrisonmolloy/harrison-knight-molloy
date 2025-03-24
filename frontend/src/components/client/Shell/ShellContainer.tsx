import { usePanes } from "hooks/usePanes";

type ShellContainerPropTypes = {
  children: React.ReactNode;
  onClick: () => void;
  paneId: number;
};

export function ShellContainer({
  children,
  onClick,
  paneId,
}: ShellContainerPropTypes) {
  const { panes } = usePanes();
  const { isOpen } = panes[paneId];

  return (
    <div onClick={onClick} className={isOpen ? "" : "h-0 w-0 overflow-hidden"}>
      {children}
    </div>
  );
}
