export function Nav({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 z-1000 flex w-full justify-center pb-4">
      <nav className="flex gap-3 rounded-4xl bg-stone-300 px-4 py-3 opacity-95 drop-shadow-lg">
        {children}
      </nav>
    </div>
  );
}
