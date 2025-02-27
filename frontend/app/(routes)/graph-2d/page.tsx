"use client";

import dynamic from "next/dynamic";

const Graph2d = dynamic(() => import("@/app/components/Graph2d"), {
  ssr: false,
});

export default function Home() {
  return <Graph2d />;
}
