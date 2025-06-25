import type { FC } from "react";
import { useGetTasksQuery } from "../utilities/redux";
import { Loading } from "./Loading.tsx";

export const TaskGrid: FC = () => {
  const { data, error, isLoading } = useGetTasksQuery();

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
                  <input type="checkbox" className="checkbox" />
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
