import { PaneManager } from "components/client/PaneManager/PaneManager";
import { PaneType } from "types/paneType";

export default function Home() {
  const initialPanes: PaneType[] = [
    {
      title: "/harriknight/graph",
      isOpen: true,
      isActive: true,
      type: "shell",
      startUpCommands: ["graph", "help"],
    },
    {
      title: "harriknight/all-posts",
      isOpen: true,
      isActive: false,
      type: "shell",
      startUpCommands: ["posts"],
    },
  ];

  return <PaneManager initialPanes={initialPanes} />;
}
