import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ToDoApp from "./components/ToDoApp";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ToDoApp />} />
      </Routes>
    </Router>
  );
};

export default App;
