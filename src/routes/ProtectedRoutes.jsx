import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "../store/user";

const ProtectedRoutes = () => {
  const token = useUserStore.getState(''); // La función getUser() devuelve el usuario si está logueado o null si no lo está.

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;