import { useEffect, useState } from "react";

export function Spinner({ message }: { message?: string }) {
  const [frame, setFrame] = useState(0);
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (frame < frames.length) {
        setFrame(frame + 1);
      } else {
        setFrame(0);
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [frames.length, frame, setFrame]);

  return frames[frame] + " " + (message || "loading");
}
