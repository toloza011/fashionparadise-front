import React, { useState } from "react";
import SidebarCart from "../../organisms/SidebarCart/SidebarCart";
import SearchBoxFloat from "../../molecules/SearchBoxFloat/SearchBoxFloat";
import Navbar from "../../organisms/Navbar";
import Footer from "../../organisms/Footer/Footer";
import MainRoutes from "../../../routes/MainRoutes";

const ShopTemplate = () => {
  const [openSidebarCart, setopenSidebarCart] = useState(false);
  const [openSearchBox, setopenSearchBox] = useState(false);

  const cartProducts = [
    {
      id: 1,
      name: "Producto de prueba 1",
      img: "https://easycl.vtexassets.com/arquivos/ids/699878/1680091573087_1376165-03.jpg",
      amount: "2",
      price: "1990",
    },
    {
      id: 2,
      name: "Producto de prueba 1",
      img: "https://easycl.vtexassets.com/arquivos/ids/699878/1680091573087_1376165-03.jpg",
      amount: "3",
      price: "4990",
    },
    {
      id: 3,
      name: "Producto de prueba 1",
      img: "https://easycl.vtexassets.com/arquivos/ids/699878/1680091573087_1376165-03.jpg",
      amount: "3",
      price: "4990",
    },
    {
      id: 4,
      name: "Producto de prueba 1",
      img: "https://easycl.vtexassets.com/arquivos/ids/699878/1680091573087_1376165-03.jpg",
      amount: "3",
      price: "4990",
    },
    {
      id: 5,
      name: "Producto de prueba 1",
      img: "https://easycl.vtexassets.com/arquivos/ids/699878/1680091573087_1376165-03.jpg",
      amount: "3",
      price: "4990",
    },
  ];

  return (
    <div className="relative z-10">
      <Navbar
        setopenSidebarCart={setopenSidebarCart}
        openSidebarCart={openSidebarCart}
        setopenSearchBox={setopenSearchBox}
        openSearchBox={openSearchBox}
      />
      <SearchBoxFloat
        setopenSearchBox={setopenSearchBox}
        openSearchBox={openSearchBox}
      />
      <MainRoutes />
      <SidebarCart
        cartProducts={cartProducts}
        openSidebarCart={openSidebarCart}
        setopenSidebarCart={setopenSidebarCart}
      />
      <Footer />
    </div>
  );
};

export default ShopTemplate;
