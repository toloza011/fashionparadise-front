import { useMutation } from "@tanstack/react-query";
import {
  getCategorie,
  getCategoriesMenu,
} from "../../services/categoriesService";

const useGetCategoriesMenu = () => {
  return useMutation({
    mutationKey: "getCategoriesMenu",
    mutationFn: (data) => getCategoriesMenu(data),
  });
};

const useGetCategorie = () => {
  return useMutation({
    mutationKey: "getCategorie",
    mutationFn: (data) => getCategorie(data),
  });
};

export { useGetCategoriesMenu, useGetCategorie };
