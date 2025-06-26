import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { INewTask, ITask } from "../../types";

const baseUrl = "http://localhost:8080";

export const localServerApi = createApi({
  reducerPath: "localServerApi",
  tagTypes: ["Update"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => "/tasks",
      providesTags: ["Update"],
    }),
    createTask: builder.mutation<ITask, string>({
      query: (newTaskStr: string) => ({
        url: "/tasks",
        method: "POST",
        body: { text: newTaskStr },
      }),
      invalidatesTags: ["Update"],
    }),
    updateTaskText: builder.mutation({
      query: (selectedTask: INewTask) => ({
        url: `/tasks/${selectedTask.id}`,
        method: "POST",
        body: { text: selectedTask.text },
      }),
      invalidatesTags: ["Update"],
    }),
    deleteTask: builder.mutation({
      query: (selectedTaskId: string) => ({
        url: `/tasks/${selectedTaskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Update"],
    }),
    completeTask: builder.mutation({
      query: (selectedTaskId: string) => ({
        url: `/tasks/${selectedTaskId}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["Update"],
    }),
    incompleteTask: builder.mutation({
      query: (selectedTaskId: string) => ({
        url: `/tasks/${selectedTaskId}/incomplete`,
        method: "POST",
      }),
      invalidatesTags: ["Update"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskTextMutation,
  useDeleteTaskMutation,
  useCompleteTaskMutation,
  useIncompleteTaskMutation,
} = localServerApi;
