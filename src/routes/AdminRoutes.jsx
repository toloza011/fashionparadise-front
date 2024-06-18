import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const AdminRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={<h1 className="pt-10 text-red-600">asdasdsadasdasd</h1>}
      />
      <Route path="/ruta-privada" element={<h1>Esta es una ruta privada</h1>} />
    </Routes>
  );
};

export default AdminRoutes;
