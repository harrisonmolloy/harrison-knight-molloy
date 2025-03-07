export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-md flex-col gap-4 rounded-lg bg-stone-50 p-6 text-stone-900 drop-shadow-md">
      {children}
    </div>
  );
}

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
