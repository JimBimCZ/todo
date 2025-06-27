import { type FC, useMemo } from "react";
import {
  type RootState,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../utilities/redux";
import type { ITask } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { showCompletedTasksOnly } from "../features";
import { useBulkComplete, useBulkDelete } from "../utilities/hooks";
import {
  countCompletedTasks,
  countIncompleteTasks,
} from "../utilities/utilFunctions";

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
  const [completeTask, { isLoading }] = useCompleteTaskMutation();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const { deleteAll } = useBulkDelete(taskData, deleteTask);
  const { completeAll } = useBulkComplete(taskData, completeTask);

  const showCompletedOnly = useSelector(
    (state: RootState) => state.todoState.showCompletedOnly,
  );

  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(showCompletedTasksOnly(!showCompletedOnly));
  };

  const showCompletedTasks = useMemo(() => {
    return countCompletedTasks(taskData);
  }, [taskData]);

  return (
    <div className="navbar bg-base-100 w-full flex justify-between items-center shadow-sm">
      <div className="menu menu-horizontal justify-between px-1 flex items-center">
        <div className="flex items-center space-x-2">
          <button
            disabled={
              isFetching ||
              isLoading ||
              isDeleting ||
              isDataLoading ||
              countIncompleteTasks(taskData) < 1
            }
            onClick={completeAll}
            className="btn btn-accent ml-3"
          >
            Complete all
          </button>
          <button
            disabled={
              isFetching ||
              isLoading ||
              isDeleting ||
              countCompletedTasks(taskData) < 1
            }
            onClick={deleteAll}
            className="btn btn-secondary ml-3"
          >
            Delete all completed
          </button>
          <div className="tooltip" data-tip="Show completed tasks only">
            <div className="flex items-center">
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
      <div className="flex items-center">
        <p className="flex">Completed tasks: {showCompletedTasks}</p>
      </div>
    </div>
  );
};
