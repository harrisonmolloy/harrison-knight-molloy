export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-md flex-col gap-4 rounded-lg bg-stone-50 p-6 text-stone-900 drop-shadow-md">
      {children}
    </div>
  );
}
