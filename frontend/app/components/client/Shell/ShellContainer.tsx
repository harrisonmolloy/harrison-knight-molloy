type ShellContainerPropTypes = {
  children: React.ReactNode;
  isOpen: boolean;
};

export function ShellContainer({ children, isOpen }: ShellContainerPropTypes) {
  return (
    <div className={`p-2 transition duration-1000 ${isOpen || "h-0 w-0 overflow-hidden"}`} > { children }</div >
  );
}
