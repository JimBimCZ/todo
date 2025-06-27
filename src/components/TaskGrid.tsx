import { type FC, memo } from "react";
import { type RootState, useDeleteTaskMutation } from "../utilities/redux";
import { useDispatch, useSelector } from "react-redux";
import type { INewTask, ITask } from "../types";
import { clearTask, setTask } from "../features";
import { TiDelete } from "react-icons/ti";
import { isCustomError } from "../utilities/utilFunctions";
import { toast } from "react-toastify";

interface Props {
  taskData: ITask[];
  isFetching: boolean;
  isLoading: boolean;
}

export const TaskGrid: FC<Props> = memo(
  ({ taskData, isFetching, isLoading }) => {
    const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

    const dispatch = useDispatch();

    const tasksToShow = useSelector((state: RootState) => state.todoState.show);
    const renderData = () => {
      if (tasksToShow.completed) {
        return taskData.filter((task) => task.completed);
      } else if (tasksToShow.active) {
        return taskData.filter((task) => !task.completed);
      } else {
        return taskData;
      }
    };

    const selectedTask: INewTask = useSelector(
      (state: RootState) => state.todoState.task,
    );

    const handleDeleteTask = async (id: string) => {
      try {
        await deleteTask(id).unwrap();
        dispatch(clearTask());
        toast.success("Task has been successfully deleted :)");
      } catch (err) {
        dispatch(clearTask());
        if (isCustomError(err)) {
          toast.error(`Error deleting task ${id}: ${err.error}`);
        } else {
          toast.error(`Unknown error deleting task ${id}: ${err}`);
        }
      }
    };

    return (
      <ul className="list bg-base-90 rounded-box shadow-md">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
          {!taskData || taskData.length === 0
            ? `Let's create our first task`
            : "Select a task you wish to update by clicking on the checkbox ;)"}
        </li>

        <li className="hidden sm:flex justify-between p-2 bg-base-200 font-semibold">
          <div className="w-1/4 text-start">Name</div>
          <div className="w-1/4 text-start">Date created</div>
          <div className="w-1/4 text-start">Status</div>
          <div className="w-1/4 text-start">Delete</div>
        </li>

        {taskData.length > 0
          ? renderData().map((todo) => (
              <li
                key={todo.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4"
              >
                <div className="flex items-center space-x-2 mb-2 sm:mb-0 flex-1 w-full sm:w-1/4 text-center sm:text-left">
                  <input
                    disabled={isFetching || isDeleting}
                    type="checkbox"
                    className="checkbox"
                    checked={selectedTask.id === todo.id}
                    onChange={() => {
                      if (selectedTask.id === todo.id) {
                        dispatch(clearTask());
                      } else {
                        dispatch(
                          setTask({
                            text: todo.text,
                            id: todo.id,
                            completed: todo.completed,
                          }),
                        );
                      }
                    }}
                  />
                  <span className="break-words">{todo.text}</span>
                </div>
                <div className="w-full sm:w-1/4 text-center sm:text-left">
                  {new Date(todo.createdDate).toDateString()}
                </div>
                <div className="w-full sm:w-1/4 text-center sm:text-left">
                  {todo.completed ? "All done" : "Not yet"}
                </div>
                <div className="w-full sm:w-1/4 flex justify-center sm:justify-start mt-2 sm:mt-0">
                  <button
                    className="btn btn-ghost btn-square"
                    disabled={isLoading || isFetching || isDeleting}
                    onClick={() => handleDeleteTask(todo.id)}
                  >
                    <TiDelete size="25" />
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>
    );
  },
);
