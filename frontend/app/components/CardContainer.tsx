export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-around gap-8 pt-32">
      {children}
    </div>
  );
}
