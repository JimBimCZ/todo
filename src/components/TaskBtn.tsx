// this button enables adding a new taskSlice.ts or changing taskSlice.ts name

import type { FC } from "react";

interface Props {
  isAddTask: boolean;
  handleClick: () => void;
  disabled: boolean;
}

export const TaskBtn: FC<Props> = ({ isAddTask, handleClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="btn btn-primary"
    >
      {isAddTask ? "Add taskSlice.ts" : "Update taskSlice.ts"}
    </button>
  );
};
