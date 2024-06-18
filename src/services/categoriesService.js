import client from "../config/axios";

const getCategoriesMenu = () => {
  return client
    .get("store/categories/getCategoriesMenu")
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const getCategorie = (data) => {
  return client
    .get(`store/categories/getCategorie/${data.slug}`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export { getCategoriesMenu, getCategorie };
