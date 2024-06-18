import { useMutation } from "@tanstack/react-query";
import { login, registerUser,getUser } from "../../services/userService";

const useRegister = () => {
  return useMutation({
    mutationKey: "register",
    mutationFn: (data) => registerUser(data),
  });
};

const useLogin = () => {
  return useMutation({
    mutationKey: "login",
    mutationFn: (data) => login(data),
  });
};

const useGetUser = () => {
  return useMutation({
    mutationKey: "getUser",
    mutationFn: (data) => getUser(data),
  });
};


export { useRegister, useLogin , useGetUser};
