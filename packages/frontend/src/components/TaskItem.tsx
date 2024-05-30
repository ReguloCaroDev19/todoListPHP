import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks, toggleTask } from "../redux/taskActions";
import { AppDispatch, RootState } from "../redux/store";

interface Task {
  id: number;
  titulo: string;
  completed: boolean;
}

interface TaskItemProps {
  todo: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ todo }) => {
  const [theme] = useState<string>(
    localStorage.getItem("savedTheme") || "standard"
  );
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
 useEffect(() => {
   if (taskStatus === "idle") {
     dispatch(fetchTasks());
   }
 }, [taskStatus, dispatch]);
  return (
    <li
      className={`p-2 mb-2 border rounded flex justify-between items-center ${
        theme === "darker" ? "text-white" : "text-black"
      } ${todo.completed ? "completed" : ""}`}
    >
      <span className={todo.completed ? "line-through" : ""}>
        {todo.titulo}
      </span>
      <div>
        <button
          onClick={handleToggle}
          className={`p-2 mx-1 border rounded ${
            theme === "darker" ? "light-button" : "darker-button"
          }`}
        >
          ✔
        </button>
        <button
          onClick={handleDelete}
          className={`p-2 mx-1 border rounded ${
            theme === "darker" ? "light-button" : "darker-button"
          }`}
        >
          ✖
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
