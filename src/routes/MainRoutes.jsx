import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import HomePage from "../components/pages/HomePage/HomePage";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import ProductDetails from "../components/pages/ProductDetails/ProductDetails";
import Catalogue from "../components/pages/Catalogue/Catalogue";

const MainRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, [location]);

  return (
    <div className="content  w-full mx-auto pt-32">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" index element={<HomePage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/catalogo/:category?/:tag?" element={<Catalogue />} />

        {/* Rutas de Admin privadas */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Rutas privadas de la tienda */}
        <Route path="/" element={<ProtectedRoutes />}>
          <Route
            path="/ruta-privada"
            element={<h1>Esta es una ruta privada</h1>}
          />
        </Route>
        <Route path="404" element={<h1>404</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
};

export default MainRoutes;
