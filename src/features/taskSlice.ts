import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DefaultState {
  task: { text: string; id: string; completed: boolean };
  show: { all: boolean; active: boolean; completed: boolean };
}

const initialState: DefaultState = {
  task: { text: "", id: "", completed: false },
  show: { all: true, active: false, completed: false },
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
    setShow: (
      state,
      action: PayloadAction<{
        all: boolean;
        active: boolean;
        completed: boolean;
      }>,
    ) => {
      state.show = { ...state.show, ...action.payload };
    },
  },
});

export const { setTask, clearTask, setShow } = taskSlice.actions;
export default taskSlice.reducer;
