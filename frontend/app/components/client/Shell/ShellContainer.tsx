type ShellContainerPropTypes = {
  children: React.ReactNode;
  isOpen: boolean;
};

export function ShellContainer({ children, isOpen }: ShellContainerPropTypes) {
  return (
    <div className={isOpen ? "p-2" : "h-0 w-0 overflow-hidden"}>{children}</div>
  );
}
