import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nav } from "components/Nav";
import { NavButton } from "components/NavButton";
import { Container } from "components/Container";

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
    <html lang="en" className="bg-stone-200 font-base">
      <body>
        <Nav>
          <NavButton>Home</NavButton>
          {/* <NavButton href="/graph-2d">Graph</NavButton> */}
          <NavButton href="/posts/projects">Projects</NavButton>
          <NavButton href="/about">about</NavButton>
        </Nav>
        <Container>{children}</Container>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
