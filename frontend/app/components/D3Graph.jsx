"use client";

import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { ForceGraph } from "lib/ForceGraph";
import { data } from "lib/miserables";

export function D3Graph() {
  const ref = useRef();

  useEffect(() => {
    const div = d3.select(ref.current);
    div.append(() => ForceGraph(data));
  });

  return <div id="forceGraphD3" ref={ref}></div>;
}
