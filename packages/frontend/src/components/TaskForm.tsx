import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "../redux/store";
import { addTask, fetchTasks } from "../redux/taskActions";

const TaskForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const taskStatus = useSelector((state: RootState) => state.tasks.status);
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("savedTheme") || "light"
  );

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") {
      setError("Debes escribir algo!");
      return;
    }
    if (input.trim() === "") {
      setError("Debes escribir algo!");
      return;
    }
    if (input.trim().length > 80) {
      setError("El título no puede tener más de 80 caracteres.");
      return;
    }
    try {
      await dispatch(addTask(input));
      setInput("");
      dispatch(fetchTasks());
      setError(null);
    } catch (error: any) {
      setError("Error al agregar la tarea. Inténtalo de nuevo.");
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
  }, []);

  return (
    <div>
      <motion.form
        onSubmit={handleAddTodo}
        className="mb-4 flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <motion.input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="p-2 border rounded-l"
          transition={{ duration: 0.3 }}
        />
        <button
          type="submit"
          className={`p-2 border rounded-r ${
            theme === "darker" ? "text-white" : "text-black"
          }`}
        >
          Agregar
        </button>
      </motion.form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default TaskForm;
