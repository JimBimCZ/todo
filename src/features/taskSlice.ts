import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DefaultState {
  task: { text: string; id: string; completed: boolean };
}

const initialState: DefaultState = {
  task: { text: "", id: "", completed: false },
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTask: (
      state,
      action: PayloadAction<{
        text?: string;
        id?: string;
        completed?: boolean;
      }>,
    ) => {
      state.task = { ...state.task, ...action.payload };
    },
    clearTask: (state) => {
      state.task = { text: "", id: "", completed: false };
    },
  },
});

export const { setTask, clearTask } = taskSlice.actions;
export default taskSlice.reducer;
