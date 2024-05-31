import {
  fetchTasksFailure,
  fetchTasksLoading,
  fetchTasksSuccess,
} from "./taskReducer";
import { AppDispatch } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosConfig";

interface Task {
  id: string;
  titulo: string;
  completed: boolean;
}

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTasksLoading());

  try {
    const response = await axiosInstance.get("/tasks");
    dispatch(fetchTasksSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTasksFailure(error.response?.data?.message || error.message));
  }
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (titulo: string) => {
    const response = await axiosInstance.post<Task>("/tasks", {
      titulo,
      completed: false,
    });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await axiosInstance.delete(`/tasks/${taskId}`);
    return taskId;
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (taskId: string) => {
    const response = await axiosInstance.put<Task>(
      `/tasks/${taskId}/update-completed`,
      { completed: true }
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ task, titulo }: { task: Task; titulo: string }) => {
    const response = await axiosInstance.put<Task>(
      `/tasks/${task.id}/update-title`,
      { titulo }
    );
    return response.data;
  }
);
