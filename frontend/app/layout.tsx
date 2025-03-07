import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nav } from "components/Nav";
import { NavButton } from "components/NavButton";

import "./globals.css";

export const metadata: Metadata = {
  title: "Harri(son) Knight Molloy",
  description: "Creative Technologist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-svh w-svw bg-stone-200 font-base">
      <body className="h-svh w-svw">
        <Nav>
          <NavButton>Home</NavButton>
          <NavButton href="/graph-2d">Graph</NavButton>
          <NavButton href="/posts">Posts</NavButton>
          <NavButton href="/about">about</NavButton>
        </Nav>
        <div className="flex h-svh w-svw">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
