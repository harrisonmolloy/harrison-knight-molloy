import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Container } from "components/server/Container";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const sf_mono = localFont({
  src: "./fonts/SF-Mono-Regular.otf",
  display: "swap",
  weight: "400",
  variable: "--font-sf-mono",
});

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
    <html lang="en" className={`${sf_mono.variable}`}>
      <body>
        <Container>{children}</Container>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
