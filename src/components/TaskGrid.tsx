import { type FC } from "react";
import { type RootState, useGetTasksQuery } from "../utilities/redux";
import { Loading } from "./Loading.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { INewTask } from "../types";
import { clearTask, setTask } from "../features/taskSlice.ts";

export const TaskGrid: FC = () => {
  const { data, error, isLoading } = useGetTasksQuery();

  const dispatch = useDispatch();

  const selectedTask: INewTask = useSelector(
    (state: RootState) => state.todoState.task,
  );

  if (isLoading) return <Loading />;

  if (error) {
    return <p>There was an error ;(</p>;
  }

  return (
    <ul className="list bg-base-90 rounded-box shadow-md">
      <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">
        {!data || data.length === 0
          ? `Let's create our first task`
          : "This is what we've got so far :)"}
      </li>
      <li className="list-row flex flex-wrap justify-between">
        <div className="w-64">Name</div>
        <div className="w-50">Date created</div>
        <div className="w-20">Is it done?</div>
      </li>
      {data && data.length > 0
        ? data.map((todo) => (
            <li
              key={todo.id}
              className="list-row flex flex-wrap justify-between"
            >
              <div className="w-64">
                <span className="mr-1">
                  <input
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
            </li>
          ))
        : null}
    </ul>
  );
};
