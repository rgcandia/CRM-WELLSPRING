// src/componentes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("user"); // simple check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
