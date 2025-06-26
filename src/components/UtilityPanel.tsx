import { type FC, useMemo } from "react";
import {
  type RootState,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../utilities/redux";
import type { ITask } from "../types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showCompletedTasksOnly } from "../features/taskSlice.ts";
import { useBulkComplete, useBulkDelete } from "../utilities/hooks";

interface Props {
  taskData: ITask[];
  isFetching: boolean;
  isDataLoading: boolean;
}

export const UtilityPanel: FC<Props> = ({
  taskData,
  isFetching,
  isDataLoading,
}) => {
  const [completeTask, { isLoading, error }] = useCompleteTaskMutation();
  const [deleteTask, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTaskMutation();

  const { deleteAll } = useBulkDelete(taskData, deleteTask);
  const { completeAll } = useBulkComplete(taskData, completeTask);

  const showCompletedOnly = useSelector(
    (state: RootState) => state.todoState.showCompletedOnly,
  );

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(showCompletedTasksOnly(!showCompletedOnly));
  };

  const countCompletedTasks = useMemo(() => {
    let completedTasksCount = 0;
    taskData.forEach((task) =>
      task.completed ? (completedTasksCount = completedTasksCount + 1) : null,
    );
    return completedTasksCount;
  }, [taskData]);

  if (error) {
    return toast.error(
      "Oh no, something went horribly wrong while trying to set all tasks as completed. :(",
    );
  }

  if (deleteError) {
    return toast.error(
      "Oh no, something went horribly wrong while trying to delete all completed tasks. :(",
    );
  }

  return (
    <div className="navbar bg-base-100 w-full flex justify-between shadow-sm">
      <div className="menu menu-horizontal justify-between px-1">
        <div className="flex justify-between">
          <button
            disabled={isFetching || isLoading || isDeleting || isDataLoading}
            onClick={completeAll}
            className="btn btn-accent ml-3"
          >
            Complete all
          </button>
          <button
            disabled={isFetching || isLoading || isDeleting}
            onClick={deleteAll}
            className="btn btn-secondary ml-3"
          >
            Delete all completed
          </button>
          <div className="tooltip" data-tip="Show completed tasks only">
            <div className="flex justify-center">
              <input
                disabled={isFetching || isLoading || isDeleting}
                onChange={handleToggle}
                type="checkbox"
                className="toggle ml-3 relative"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="flex justify-self-end">
          Completed tasks: {countCompletedTasks}
        </p>
      </div>
    </div>
  );
};
