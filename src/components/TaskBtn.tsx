// this button enables adding a new taskSlice.ts or changing taskSlice.ts name

import { type FC, memo } from "react";

interface Props {
  isAddTask: boolean;
  handleClick: () => void;
  disabled: boolean;
}

export const TaskBtn: FC<Props> = memo(
  ({ isAddTask, handleClick, disabled }) => {
    return (
      <button
        disabled={disabled}
        onClick={handleClick}
        className="btn btn-primary w-full sm:w-auto"
      >
        {isAddTask ? "Add task" : "Update task"}
      </button>
    );
  },
);
