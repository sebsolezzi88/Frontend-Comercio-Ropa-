import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import type { JSX } from "react";


interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token } = useAppContext();

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;