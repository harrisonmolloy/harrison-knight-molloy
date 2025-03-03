import Link from "next/link";

export function NavButton({
  children,
  href = "/",
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="rounded-2xl bg-gray-900 px-3 py-1 text-gray-100 opacity-80 drop-shadow-md"
      href={href}
    >
      {children}
    </Link>
  );
}
