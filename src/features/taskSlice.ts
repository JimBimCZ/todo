import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DefaultState {
  task: { text: string; id: string; done: boolean };
}

const initialState: DefaultState = {
  task: { text: "", id: "", done: false },
};

const taskSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTask: (
      state,
      action: PayloadAction<{ text?: string; id?: string; done?: boolean }>,
    ) => {
      state.task = { ...state.task, ...action.payload };
    },
  },
});

export const { setTask } = taskSlice.actions;
export default taskSlice.reducer;
