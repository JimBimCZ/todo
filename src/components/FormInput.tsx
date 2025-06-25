import { type ChangeEvent, type FC } from "react";
import { type RootState, useCreateTasksMutation } from "../utilities/redux";
import { useDispatch, useSelector } from "react-redux";
import { TaskBtn } from "./TaskBtn.tsx";
import { Loading } from "./Loading.tsx";
import { setTask } from "../features/taskSlice.ts";
import type { INewTask } from "../types";

export const FormInput: FC = () => {
  // const [task, setTask] = useState({ text: "", id: "" });

  const [createTask, { isLoading, error }] = useCreateTasksMutation();

  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTask({ text: e.target.value }));
  };

  const task: INewTask = useSelector(
    (state: RootState) => state.todoState.task,
  );
  console.log(task);

  const handleCreateTask = async () => {
    await createTask(task);
  };

  return (
    <div className="m-3 p-4 flex-col align-middle justify-center">
      <div className="form-control m-auto w-full max-w-xs">
        <label className="label">
          <span className="label-text">Add a new task</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
        />
      </div>
      <div className="m-2 justify-self-center">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>There was an error :(</p>
        ) : (
          <TaskBtn
            isAddTask={!task.id}
            handleClick={handleCreateTask}
            disabled={isLoading || task.text === ""}
          />
        )}
      </div>
    </div>
  );
};
