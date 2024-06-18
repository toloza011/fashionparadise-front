import client from "../config/axios";

const registerUser = (data) => {
  return client
    .post("/register", data)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const login = (data) => {
  return client
    .post("/login", data)
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

const getUser = (token) => {
  return client
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => err.response.data);
};

export { registerUser, login, getUser };
