import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const ToDoApp = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("savedTheme") || "standard"
  );

  const changeTheme = (newTheme:any) => {
    setTheme(newTheme);
    localStorage.setItem("savedTheme", newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className={`min-h-screen p-4 ${theme}-background`}>
      <h1
        className={`text-2xl text-center mb-4 ${
          theme === "darker" ? "text-white" : "text-black"
        }`}
      >
        ToDo List
      </h1>
      <TaskForm />
      <TaskList />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => changeTheme("light")}
          className="p-2 mx-2 border rounded light-button"
        >
          Light
        </button>
        <button
          onClick={() => changeTheme("darker")}
          className="p-2 mx-2 border rounded darker-button"
        >
          Darker
        </button>
      </div>
    </div>
  );
};

export default ToDoApp;
