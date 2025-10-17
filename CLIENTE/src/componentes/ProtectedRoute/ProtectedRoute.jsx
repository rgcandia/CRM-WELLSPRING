// src/componentes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

/**
 * Evita que un usuario no logueado acceda a rutas protegidas
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // ahora validamos token
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
