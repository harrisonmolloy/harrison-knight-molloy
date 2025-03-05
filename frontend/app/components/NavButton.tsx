import Link from "next/link";

export function NavButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="rounded-2xl bg-black px-3 py-1 text-gray-100 opacity-95 drop-shadow-sm transition-all duration-500 hover:rotate-3 hover:drop-shadow-xl"
      href={href}
    >
      {children}
    </Link>
  );
}
