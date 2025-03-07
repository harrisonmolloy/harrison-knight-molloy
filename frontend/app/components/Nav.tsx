export function Nav({ children }: { children?: React.ReactNode }) {
  return (
    <div className="fixed bottom-8 z-10 flex w-full justify-center">
      <nav className="flex gap-3 overflow-clip rounded-4xl bg-stone-50 px-4 py-3 opacity-90 drop-shadow-xl">
        {children}
      </nav>
    </div>
  );
}
