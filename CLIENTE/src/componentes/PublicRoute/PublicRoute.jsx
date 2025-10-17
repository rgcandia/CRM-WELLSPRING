// src/componentes/PublicRoute/PublicRoute.jsx
import { Navigate } from "react-router-dom";

/**
 * Evita que un usuario logueado acceda a rutas públicas (como /login)
 */
export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token"); // validamos token

  if (token) {
    // Si ya está logueado, redirige a la raíz
    return <Navigate to="/" replace />;
  }

  return children;
}
