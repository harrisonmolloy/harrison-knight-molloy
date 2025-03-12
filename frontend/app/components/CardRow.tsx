export function CardRow({
  children,
  justify = false,
  className,
}: {
  children: React.ReactNode;
  justify?: boolean;
  className?: string;
}) {
  if (!justify) return <div className="flex gap-2">{children}</div>;
  return (
    <div className={"flex justify-between gap-2 " + className}>{children}</div>
  );
}
