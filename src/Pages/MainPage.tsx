import type { FC } from "react";
import { FormInput, TaskGrid } from "../components";

export const MainPage: FC = () => {
  return (
    <>
      <h1 className="m-2 flex flex-col items-center text-4xl">
        Let's get organised
      </h1>
      <FormInput />
      <TaskGrid />
    </>
  );
};
