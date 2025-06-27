import { type FC, memo } from "react";
import {
  useCompleteTaskMutation,
  useGetTasksQuery,
  useIncompleteTaskMutation,
} from "../utilities/redux";
import type { INewTask } from "../types";
import { useDispatch } from "react-redux";
import { setTask } from "../features";
import { isCustomError } from "../utilities/utilFunctions";
import { toast } from "react-toastify";

interface Props {
  task: INewTask;
}

export const TaskCheckbox: FC<Props> = memo(({ task }) => {
  const [completeTask, { isLoading: isCompleting }] = useCompleteTaskMutation();
  const [incompleteTask, { isLoading: isUpdating }] =
    useIncompleteTaskMutation();
  const { isFetching, isLoading } = useGetTasksQuery();

  const dispatch = useDispatch();

  const handleCompleteTask = async () => {
    try {
      await completeTask(task.id).unwrap();
      toast.success("Great job! Task successfully set as completed.");
      dispatch(setTask({ completed: true }));
    } catch (err) {
      if (isCustomError(err)) {
        toast.error(`Error completing task ${task.id}: ${err.error}`);
      } else {
        toast.error(`Unknown error completing task ${task.id}: ${err}`);
      }
    }
  };

  const handleIncompleteTask = async () => {
    try {
      await incompleteTask(task.id).unwrap();
      toast.success("Task successfully set as in progress.");
      dispatch(setTask({ completed: false }));
    } catch (err) {
      if (isCustomError(err)) {
        toast.error(`Error changing status on task ${task.text}: ${err.error}`);
      } else {
        toast.error(
          `Unknown error changing status on task ${task.text}: ${err}`,
        );
      }
    }
  };

  const handleOnChange = () => {
    if (task.completed) {
      handleIncompleteTask();
    } else {
      handleCompleteTask();
    }
  };

  return (
    <div
      className="tooltip"
      data-tip={
        task.completed
          ? "Set task status to in progress"
          : "Set task status to completed"
      }
    >
      <input
        disabled={isFetching || isLoading || isCompleting || isUpdating}
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={handleOnChange}
      />
    </div>
  );
});
