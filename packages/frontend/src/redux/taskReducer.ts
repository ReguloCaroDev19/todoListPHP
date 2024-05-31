import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Task {
  id: string;
  titulo: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksLoading(state) {
      state.status = "loading";
    },
    fetchTasksSuccess(state, action: PayloadAction<Task[]>) {
      state.status = "succeeded";
      state.tasks = action.payload;
    },
    fetchTasksFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { fetchTasksLoading, fetchTasksSuccess, fetchTasksFailure } =
  tasksSlice.actions;

export const selectTasks = (state: RootState): Task[] => state.tasks.tasks;

export default tasksSlice.reducer;
