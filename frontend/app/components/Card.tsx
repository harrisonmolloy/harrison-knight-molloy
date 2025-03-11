export function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex max-w-md flex-col gap-4 rounded-lg bg-stone-50 p-6 text-stone-900 drop-shadow-md"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
