import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetUser, useLogin } from "../../../hooks/queries/queryRegister";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import useUserStore from "../../../store/user";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const queryLogin = useLogin();
  const queryUser = useGetUser();
  const [customError, setCustomError] = useState();
  const [showMessageError, setshowMessageError] = useState(false);
  const navigate = useNavigate();

  const { login } = useUserStore((state) => ({
    login: state.login,
  }));

  const onSubmit = (data) => {
    clearErrors("customError");

    queryLogin.mutate(data, {
      onSuccess: (dataLogin) => {
        clearErrors("customError");
        setshowMessageError(false);
        if (dataLogin.status === 200) {
          // obtener data usuario
          queryUser.mutate(dataLogin.data.token, {
            onSuccess: (data) => {
              login(dataLogin.data.token, data.data);
              navigate("/");
            },
            onError: (err) => {
              setCustomError(err.message);
              setshowMessageError(true);
            },
          });
          return;
        } else {
          setCustomError(dataLogin.message);
          setshowMessageError(true);
        }
      },
      onError: (err) => {
        setError("customError", {
          type: "validate",
          message: err.message,
        });
        setCustomError(err.message);
        setshowMessageError(true);
        clearErrors();
      },
    });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  my-autolg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-pink-500 dark:text-white"
        >
          Fashion Paradise
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Ingresa a tu cuenta
            </h1>
            {/* Mensaje de error personalizado */}
            {customError && showMessageError && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{customError}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg
                    onClick={() => setshowMessageError(false)}
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            )}
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  /*  value={formLogin.email}
                  onChange={(e) =>
                    setFormLogin({ ...formLogin, email: e.target.value })
                  } */
                  {...register("email", {
                    required: "El email es requerido",
                  })}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="peter@fashionparadise.cl"
                  required=""
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <p className="text-red-500 mt-1">{message}</p>
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-red-500 mt-1 m-0">{message}</p>
                  )}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className={`${
                    queryLogin.isPending ? "flex" : "hidden"
                  } w-5 h-5 mr-3 text-indigo-500 animate-spin`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Entrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Aún no tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-pink-500 hover:underline dark:text-primary-500"
                >
                  Registrate ahora
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
