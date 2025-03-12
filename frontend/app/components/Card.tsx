export function Card({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className="p-2" onClick={onClick}>
      {children}
    </div>
  );
}
