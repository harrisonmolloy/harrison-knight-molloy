export function Article({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <article className="max-w-xl p-2" onClick={onClick}>
      {children}
    </article>
  );
}
