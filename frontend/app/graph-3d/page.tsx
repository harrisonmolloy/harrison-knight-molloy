"use client";

import dynamic from "next/dynamic";

const Graph3d = dynamic(() => import("@components/Graph3d"), { ssr: false });

export default function Home() {
  return <Graph3d />;
}
