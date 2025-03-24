import { POSTS_QUERYResult } from "types/sanity.types";

export function ViewMoreButton({
  post,
  isOpen,
  onClick,
}: {
  post: POSTS_QUERYResult[0];
  isOpen: boolean;
  onClick: () => void;
}) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onClick();
  }

  if (post.body.length < 2) return <></>;

  return (
    <button
      onClick={handleClick}
      className="cursor-pointer text-light-blue underline dark:text-dark-blue"
    >
      {isOpen ? "Close" : "View More"}
    </button>
  );
}
