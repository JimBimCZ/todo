import { type FC, memo, useMemo, useState } from "react";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../utilities/redux";
import type { ITask } from "../types";
import { useBulkComplete, useBulkDelete } from "../utilities/hooks";
import {
  countCompletedTasks,
  countIncompleteTasks,
} from "../utilities/utilFunctions";
import { useDispatch } from "react-redux";
import { clearTask, setShow } from "../features";

interface Props {
  taskData: ITask[];
  isFetching: boolean;
  isDataLoading: boolean;
}

export const UtilityPanel: FC<Props> = memo(
  ({ taskData, isFetching, isDataLoading }) => {
    const [completeTask, { isLoading }] = useCompleteTaskMutation();
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    const { deleteAll } = useBulkDelete(taskData, deleteTask);
    const { completeAll } = useBulkComplete(taskData, completeTask);
    const dispatch = useDispatch();

    const [isCollapsed, setIsCollapsed] = useState(false); // start expanded on mobile for better UX
    const showCompletedTasksCount = useMemo(() => {
      return countCompletedTasks(taskData);
    }, [taskData]);

    const handleDeleteAll = () => {
      deleteAll();
      dispatch(clearTask());
    };

    const handleCompleteAll = () => {
      completeAll();
      dispatch(clearTask());
    };

    const showAll = () =>
      dispatch(setShow({ all: true, active: false, completed: false }));
    const showCompleted = () =>
      dispatch(setShow({ all: false, active: false, completed: true }));
    const showActive = () =>
      dispatch(setShow({ all: false, active: true, completed: false }));

    return (
      <div className="navbar bg-base-100 w-full flex flex-col sm:flex-row justify-between items-center shadow-sm p-2">
        <button
          className="btn btn-secondary btn-sm mb-2 sm:mb-0 sm:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show options" : "Hide options"}
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isCollapsed ? "max-h-0" : "max-h-screen"
          } w-full sm:w-auto flex flex-col sm:flex-row items-center sm:space-x-2`}
        >
          <button
            disabled={
              isFetching ||
              isLoading ||
              isDeleting ||
              isDataLoading ||
              countIncompleteTasks(taskData) < 1
            }
            onClick={handleCompleteAll}
            className="btn btn-accent w-full sm:w-auto m-1"
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
            onClick={handleDeleteAll}
            className="btn btn-secondary w-full sm:w-auto m-1"
          >
            Delete all completed
          </button>
          <button onClick={showAll} className="btn w-full sm:w-auto m-1">
            Show all
          </button>
          <button onClick={showActive} className="btn w-full sm:w-auto m-1">
            Show active
          </button>
          <button onClick={showCompleted} className="btn w-full sm:w-auto m-1">
            Show completed
          </button>
        </div>
        <div className="flex items-center mt-2">
          <p className="">Completed tasks: {showCompletedTasksCount}</p>
        </div>
      </div>
    );
  },
);
