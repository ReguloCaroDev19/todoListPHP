import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../redux/taskActions";
import { RootState, AppDispatch } from "../redux/store";

const TaskList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.tasks.tasks);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const [filter, setFilter] = useState<string | null>(null);

  const handleFilter = (value: string | null) => {
    setFilter(value);
  };

  let filteredTodos = todos;
  if (filter !== null) {
    filteredTodos = todos.filter((todo: any) => {
      if (filter === "completed") {
        return todo.completed;
      } else if (filter === "uncompleted") {
        return !todo.completed;
      }
      return true;
    });
  }

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => handleFilter(null)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
        >
          Todas
        </button>
        <button
          onClick={() => handleFilter("completed")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          Completadas
        </button>
        <button
          onClick={() => handleFilter("uncompleted")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          No Completadas
        </button>
      </div>
      <ul className="list-none">
        {filteredTodos.map((todo: any) => (
          <TaskItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
