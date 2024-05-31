
import axios from "axios";
import { fetchTasksFailure, fetchTasksLoading, fetchTasksSuccess } from "./taskReducer";
import { AppDispatch } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface Task {
  id: string;
  titulo: string;
  completed: boolean;
}

export const fetchTasks = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTasksLoading());

  try {
    // Realizar la solicitud para obtener las tareas
    const response = await axios.get<Task[]>("http://localhost:8000/tasks");

    // Despachar la acción de éxito y pasar los datos de las tareas
    dispatch(fetchTasksSuccess(response.data));
  } catch (error:any) {
    // Despachar la acción de falla y pasar el mensaje de error
    dispatch(fetchTasksFailure(error.response?.data?.message || error.message));
  }
};
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (titulo: string) => {
    const response = await axios.post<Task>("http://127.0.0.1:8000/tasks", {
      titulo,
      completed: false,
    });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string) => {
    await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`);
    return taskId;
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (taskId: string) => {
    const response = await axios.put<Task>(
      `http://127.0.0.1:8000/tasks/${taskId}/update-completed`,
      { completed: true }
    );
    return response.data;
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask", 
  async ({ task, titulo }: { task: Task; titulo: string }) => {
    const response = await axios.put<Task>(
      `http://127.0.0.1:8000/tasks/${task.id}/update-title`,
      { titulo }
    );
    return response.data;
  }
);
