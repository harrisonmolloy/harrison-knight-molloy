import { PaneManager, PaneType } from "components/client/PaneManager";

export default function Home() {
  const initialPanes: PaneType[] = [
    {
      title: "/harriknight/graph",
      isOpen: true,
      type: "shell",
      startUpCommands: ["graph", "help"],
    },
    {
      title: "harriknight/all-posts",
      isOpen: true,
      type: "shell",
      startUpCommands: ["posts"],
    },
  ];

  return <PaneManager initialPanes={initialPanes} />;
}
