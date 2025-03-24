export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-svh overflow-hidden max-md:flex-col">
      {children}
    </main>
  );
}
