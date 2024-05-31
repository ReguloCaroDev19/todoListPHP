import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  toggleTask,
  updateTask,
} from "../redux/taskActions";
import { AppDispatch, RootState } from "../redux/store";

interface Task {
  id: string;
  titulo: string;
  completed: boolean;
}

interface TaskItemProps {
  todo: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo }) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("savedTheme") || "light"
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.titulo);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteTask(todo.id));
    await dispatch(fetchTasks());
  };

  const handleToggle = async () => {
    await dispatch(toggleTask(todo.id));
    await dispatch(fetchTasks());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    await dispatch(updateTask({ task: todo, titulo: editedTitle }));
    setIsEditing(false);
	await dispatch(fetchTasks());
  };

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("savedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "savedTheme") {
        setTheme(event.newValue || "light");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage.getItem("savedTheme")]);

  return (
    <li
      className={`p-2 mb-2 border rounded flex justify-between items-center ${
        theme === "darker" ? "text-white" : "text-black"
      } ${todo.completed ? "completed" : ""}`}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="px-2 py-1 border rounded"
        />
      ) : (
        <span
          className={`${todo.completed ? "line-through" : ""} ${
            theme === "darker" ? "text-white" : "text-black"
          }`}
        >
          {todo.titulo}
        </span>
      )}
      <div>
        {isEditing ? (
          <button
            onClick={handleSaveEdit}
            className={`p-2 mx-1 border rounded light-button`}
          >
            Guardar
          </button>
        ) : (
          <>
            <button
              onClick={handleToggle}
              className={`p-2 mx-1 border rounded light-button`}
            >
              ✔
            </button>
            <button
              onClick={handleEdit}
              className={`p-2 mx-1 border rounded light-button`}
            >
              Editar
            </button>
            <button
              onClick={handleDelete}
              className={`p-2 mx-1 border rounded light-button`}
            >
              ✖
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
