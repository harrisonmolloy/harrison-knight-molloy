import type { Metadata } from "next";
import type { Viewport } from "next";

import localFont from "next/font/local";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "components/client/Providers/Providers";
import { Container } from "components/server/Container";

const sf_mono = localFont({
  src: "./fonts/sf-mono-regular.otf",
  display: "swap",
  weight: "400",
  variable: "--font-sf-mono",
});

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "oklch(1 0 0)" },
    { media: "(prefers-color-scheme: dark)", color: "oklch(0.27 0.01 257)" },
  ],
};

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
        <Providers>
          <Container>{children}</Container>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
