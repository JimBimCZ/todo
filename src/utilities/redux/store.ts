import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { localServerApi } from "./localServerApi.ts";

export const store = configureStore({
  reducer: {
    [localServerApi.reducerPath]: localServerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localServerApi.middleware),
});

setupListeners(store.dispatch);
