import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoApp from './components/ToDoApp';
import { AuthProvider } from "./Auth/AuthContext";
import Login from "./components/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Registro from "./components/Registro";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <ToDoApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
