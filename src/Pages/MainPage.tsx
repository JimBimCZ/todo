import type { FC } from "react";
import { FormInput, TaskGrid, UtilityPanel } from "../components";
import { useGetTasksQuery } from "../utilities/redux";

export const MainPage: FC = () => {
  const { data, error, isLoading, isFetching } = useGetTasksQuery();

  return (
    <>
      <h1 className="m-2 flex flex-col items-center text-4xl">
        Let's get organised
      </h1>
      <FormInput
        isFetching={isFetching}
        dataError={error}
        isDataLoading={isLoading}
        data={data ?? []}
      />
      <UtilityPanel
        taskData={data ?? []}
        isFetching={isFetching}
        isDataLoading={isLoading}
      />
      <TaskGrid
        taskData={data ?? []}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  );
};
