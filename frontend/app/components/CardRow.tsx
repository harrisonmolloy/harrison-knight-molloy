export function CardRow({
  children,
  justify = false,
}: {
  children: React.ReactNode;
  justify?: boolean;
}) {
  if (!justify) return <div className="flex gap-3">{children}</div>;
  return <div className="flex justify-between gap-3">{children}</div>;
}
