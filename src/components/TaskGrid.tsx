import { type FC } from "react";
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

export const TaskGrid: FC<Props> = ({ taskData, isFetching, isLoading }) => {
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const dispatch = useDispatch();

  const showingCompletedTasksOnly: boolean = useSelector(
    (state: RootState) => state.todoState.showCompletedOnly,
  );
  const renderData = () => {
    if (showingCompletedTasksOnly) {
      return taskData.filter((task) => task.completed);
    }
    return taskData;
  };

  const selectedTask: INewTask = useSelector(
    (state: RootState) => state.todoState.task,
  );

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id).unwrap();
    } catch (err) {
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
          : "This is what we've got so far :)"}
      </li>
      <li className="hidden sm:flex justify-between p-2 bg-base-200 font-semibold">
        <div className="flex-1 sm:w-1/4 text-center sm:text-left">Name</div>
        <div className="flex-1 sm:w-1/4 text-center sm:text-left">
          Date created
        </div>
        <div className="flex-1 sm:w-1/4 text-center sm:text-left">
          Is it done?
        </div>
        <div className="flex-1 sm:w-1/4 text-center sm:text-left">
          Delete Task
        </div>
      </li>
      {taskData.length > 0
        ? renderData().map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col justify-between items-center sm:items-center p-2"
            >
              <div className="flex items-center space-x-2 flex-1 sm:w-1/4 text-center sm:text-left">
                <input
                  disabled={isFetching || isDeleting}
                  type="checkbox"
                  className="checkbox mr-2"
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
              <div className="flex items-center justify-center sm:w-1/4 text-center sm:text-left">
                {new Date(todo.createdDate).toDateString()}
              </div>
              <div className="flex items-center justify-center sm:w-1/4 text-center sm:text-left">
                {todo.completed ? "All done" : "Not yet"}
              </div>
              <div className="flex items-center justify-center sm:w-1/4 mt-2 sm:mt-0">
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
};
