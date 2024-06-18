import { useMutation } from "@tanstack/react-query";
import {
  getLastProducts,
  getProduct,
  getProductsMostSold,
} from "../../services/productsService";

const useGetProductsMostSold = () => {
  return useMutation({
    mutationKey: "getProductsMostSold",
    mutationFn: (data) => getProductsMostSold(data),
  });
};

const useGetProduct = () => {
  return useMutation({
    mutationKey: "getProduct",
    mutationFn: (data) => getProduct(data),
  });
};

const useGetLastProducts = () => {
  return useMutation({
    mutationKey: "getLastProducts",
    mutationFn: (data) => getLastProducts(data),
  });
};

export { useGetProductsMostSold, useGetProduct, useGetLastProducts };
