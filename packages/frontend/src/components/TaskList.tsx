// src/components/TaskList.tsx
import React, { useEffect } from "react";
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

  return (
    <ul className="list-none">
      {todos.map((todo:any) => (
        <TaskItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TaskList;
