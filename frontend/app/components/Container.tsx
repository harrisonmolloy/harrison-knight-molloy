export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-svh flex-col justify-around px-4 pb-32">
      {children}
    </main>
  );
}
