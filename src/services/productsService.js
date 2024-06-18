import client from "../config/axios";

const getProductsMostSold = () => {
  return client
    .get("store/products/getProductsMostSold")
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const getProduct = (id) => {
  return client
    .get(`store/products/getProduct/${id}`)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const getLastProducts = () => {
  return client
    .get("store/products/getLastProducts")
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export { getProductsMostSold, getProduct, getLastProducts };
