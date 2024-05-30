import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addTask, fetchTasks } from "../redux/taskActions";

const TaskForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const taskStatus = useSelector((state: RootState) => state.tasks.status);
  const [theme] = useState<string>(
    localStorage.getItem("savedTheme") || "standard"
  );

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Debes escribir algo!");
      return;
    }

    try {
      await dispatch(addTask(input)); 
      setInput("");
      dispatch(fetchTasks());
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  useEffect(() => {
    if (taskStatus === "idle") {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleAddTodo} className="mb-4 flex justify-center">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="p-2 border rounded-l"
      />
      <button
        type="submit"
        className={`p-2 border rounded-r ${
          theme === "darker" ? "text-white" : "text-black"
        }`}
      >
        Agregar
      </button>
    </form>
  );
};

export default TaskForm;
