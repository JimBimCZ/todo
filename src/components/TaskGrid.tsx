import { type FC } from "react";
import { type RootState, useDeleteTaskMutation } from "../utilities/redux";
import { useDispatch, useSelector } from "react-redux";
import type { INewTask, ITask } from "../types";
import { clearTask, setTask } from "../features/taskSlice.ts";
import { TiDelete } from "react-icons/ti";
import { isCustomError } from "../utilities/utilFunctions";
import { toast } from "react-toastify";

interface Props {
  taskData: ITask[];
  isFetching: boolean;
  isLoading: boolean;
}

export const TaskGrid: FC<Props> = ({ taskData, isFetching, isLoading }) => {
  const [deleteTask, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTaskMutation();

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
      await deleteTask(id);
    } catch (err) {
      if (isCustomError(err)) {
        toast.error(`Error completing task ${id}: ${err.error}`);
      } else {
        toast.error(`Unknown error completing task ${id}: ${err}`);
      }
    }
  };

  if (deleteError) {
    return toast.error(
      "Oh no, something went horribly wrong while trying to delete this task. :(",
    );
  }

  return (
    <ul className="list bg-base-90 rounded-box shadow-md">
      <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
        {!taskData || taskData.length === 0
          ? `Let's create our first task`
          : "This is what we've got so far :)"}
      </li>
      <li className="list-row flex flex-wrap justify-between">
        <div className="w-64">Name</div>
        <div className="w-50">Date created</div>
        <div className="w-20">Is it done?</div>
        <div className="w-20">Delete Task</div>
      </li>
      {taskData.length > 0
        ? renderData().map((todo) => (
            <li
              key={todo.id}
              className="list-row flex flex-wrap justify-between"
            >
              <div className="w-64">
                <span className="mr-1">
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
                </span>
                {todo.text}
              </div>
              <div className="w-50">
                {new Date(todo.createdDate).toDateString()}
              </div>
              <div className="w-20">
                {todo.completed ? "All done" : "Not yet"}
              </div>
              <div className="list-row flex flex-wrap w-15">
                <button
                  className="cursor-pointer"
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
