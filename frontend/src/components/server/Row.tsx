export function Row({
  children,
  justify = false,
  className,
}: {
  children: React.ReactNode;
  justify?: boolean;
  className?: string;
}) {
  if (justify)
    return (
      <div className={"flex flex-wrap justify-between gap-x-2 " + className}>
        {children}
      </div>
    );
  return (
    <div className={"flex flex-wrap gap-x-2 " + className}>{children}</div>
  );
}
