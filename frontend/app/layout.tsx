import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nav } from "components/Nav";
import { NavButton } from "components/NavButton";
import { Main } from "components/Main";

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
    <html lang="en">
      <body>
        <Nav>
          <NavButton href="./">Home</NavButton>
          <NavButton href="./graph-2d">Graph</NavButton>
          <NavButton href="./posts">Posts</NavButton>
          <NavButton href="./about">about</NavButton>
        </Nav>
        {/* <Main></Main> */}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
