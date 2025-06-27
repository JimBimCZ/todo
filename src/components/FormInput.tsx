import { type ChangeEvent, type FC, memo } from "react";
import {
  type RootState,
  useCreateTaskMutation,
  useUpdateTaskTextMutation,
} from "../utilities/redux";
import { useDispatch, useSelector } from "react-redux";
import { TaskBtn } from "./TaskBtn.tsx";
import { Loading } from "./Loading.tsx";
import { clearTask, setTask } from "../features";
import type { INewTask, ITask } from "../types";
import { TaskCheckbox } from "./TaskCheckbox.tsx";
import { isCustomError } from "../utilities/utilFunctions";
import { toast } from "react-toastify";

interface Props {
  isFetching: boolean;
  isDataLoading: boolean;
  data: ITask[];
}

export const FormInput: FC<Props> = memo(
  ({ isFetching, isDataLoading, data }) => {
    const [createTask, { isLoading }] = useCreateTaskMutation();

    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskTextMutation();

    const dispatch = useDispatch();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setTask({ text: e.target.value }));
    };

    const task: INewTask = useSelector(
      (state: RootState) => state.todoState.task,
    );

    const handleCreateUpdateTask = async () => {
      if (!task.id) {
        try {
          await createTask(task.text).unwrap();
          toast.success("Task created successfully :)");
          dispatch(clearTask());
        } catch (err) {
          if (isCustomError(err)) {
            toast.error(`Error creating task: ${err.error}`);
          } else {
            toast.error(`Unknown error creating task ${err}`);
          }
        }
      } else {
        try {
          await updateTask(task).unwrap();
          toast.success("Task updated successfully :)");
          dispatch(clearTask());
        } catch (err) {
          if (isCustomError(err)) {
            toast.error(`Error updating task: ${task.text}: ${err.error}`);
          } else {
            toast.error(`Unknown error updating task: ${task.text}: ${err}`);
          }
        }
      }
    };

    return (
      <div className="m-3 p-4 flex-col align-middle justify-center">
        <div className="form-control m-auto w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              {!task.id || data.length === 0
                ? "Add a new task"
                : "Update existing task"}
            </span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={handleInputChange}
            value={task.text}
          />
        </div>
        <div className="m-2 justify-self-center">
          <div className="flex align-middle justify-between w-80 max-w-xs">
            <TaskBtn
              isAddTask={!task.id || (task.text === "" && !task.id)}
              handleClick={handleCreateUpdateTask}
              disabled={
                isLoading ||
                isUpdating ||
                isFetching ||
                isDataLoading ||
                task.text === ""
              }
            />
            <div className="m-1.5">
              {task.id && <TaskCheckbox task={task} />}
            </div>
          </div>
        </div>
        {(isLoading || isUpdating || isFetching || isDataLoading) && (
          <div className="flex">
            <Loading />
          </div>
        )}
      </div>
    );
  },
);
