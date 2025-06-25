import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { INewTask, ITask } from "../../types";

const baseUrl = "http://localhost:8080";

export const localServerApi = createApi({
  reducerPath: "localServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({ query: () => "/tasks" }),
    createTasks: builder.mutation<ITask, INewTask>({
      query: (newPost) => ({
        url: "/tasks",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

export const { useGetTasksQuery, useCreateTasksMutation } = localServerApi;
