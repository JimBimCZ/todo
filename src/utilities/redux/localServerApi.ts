import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../axios";
import type { INewTask, ITask } from "../../types";

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
