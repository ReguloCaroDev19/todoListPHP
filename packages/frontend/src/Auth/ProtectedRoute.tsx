import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();

  if (!auth || !auth.token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
