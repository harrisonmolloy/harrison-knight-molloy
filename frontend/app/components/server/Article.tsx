export function Article({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <article className="max-w-xl" onClick={onClick}>
      {children}
      <br />
    </article>
  );
}
