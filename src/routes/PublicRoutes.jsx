import { Outlet, Navigate } from "react-router-dom";
import useUserStore from "../store/user";

const PublicRoutes = () => {

  const token = useUserStore.getState('');;
  if (!token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoutes;