"use client";

import { Pane } from "components/client/Pane";
import { Graph } from "components/client/Graph";
import { useState } from "react";
import { PostList } from "../server/PostList";

export function PaneManager() {
  const [panes, setPanes] = useState([
    {
      title: "/Graph",
      isOpen: true,
      content: <Graph />,
    },
    {
      title: "/Posts",
      isOpen: false,
      content: <PostList />,
    },
  ]);

  // function removePane(position) {
  //   setPanes([...panes.slice(0, position), ...panes.slice(position + 1)]);
  // }

  function togglePane(position: number) {
    const panesCopy = panes.slice();
    panesCopy[position].isOpen = !panes[position].isOpen;
    setPanes(panesCopy);
  }

  function handleXClick(position: number) {
    togglePane(position);
  }

  function handleClosedClick(position: number) {
    togglePane(position);
  }

  return (
    <>
      {panes.map((pane, id) => (
        <Pane
          key={id}
          position={id}
          title={pane.title}
          isOpen={pane.isOpen}
          onXClick={handleXClick}
          onClosedClick={handleClosedClick}
        >
          {pane.content}
        </Pane>
      ))}
    </>
  );
}
