export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-md flex-col gap-4 rounded-lg bg-gray-200 p-8 drop-shadow-md">
      {children}
    </div>
  );
}

export function CardRow({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-between gap-3">{children}</div>;
}
