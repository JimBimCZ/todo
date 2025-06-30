import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { localServerApi } from "./localServerApi.ts";
import taskReducer from "../../features/taskSlice.ts";

export const store = configureStore({
  reducer: {
    [localServerApi.reducerPath]: localServerApi.reducer,
    todoState: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localServerApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export const todoReducer = taskReducer;
