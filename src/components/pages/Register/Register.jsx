import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { formatearRut } from "../../../helpers/Helpers";
import { ErrorMessage } from "@hookform/error-message";
import { useRegister } from "../../../hooks/queries/queryRegister";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../../../store/user";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      rut: "",
      name: "",
      surnames: "",
      terms_and_conditions: false,
    },
  });

  const [rutFormatter, setrutFormatter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (rutFormatter && rutFormatter.length === 0) {
      setError("rut", {
        type: "required",
        message: "El rut es requerido",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rutFormatter]);
  const { login } = useUserStore((state) => ({
    login: state.login,
  }));

  const queryRegister = useRegister();

  const onSubmit = (data) => {
    queryRegister.mutate(
      {
        ...data,
        rut: rutFormatter,
      },
      {
        onSuccess: (data) => {
          clearErrors();
          if (!data.errors) {
            toast.success("Cuenta creada exitosamente", {
              position: "top-right",
              duration: "1000",
            });

            login(data.data.api_token, data.data.user);

            return navigate("/");
          }
          Object.keys(data.errors).forEach((error) => {
            setError(error, {
              type: "validate",
              message: data.errors[error][0],
            });
          });
        },
        onError: (err) => {
          console.log("err", err);
        },
      }
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  ">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-pink-500 dark:text-white"
        >
          Fashion Paradise
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-6xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crea tu cuenta
            </h1>
            <form
              className="md:space-y-6 flex flex-wrap justify-center min-w-3xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="pt-3 flex gap-3 justify-center flex-wrap ">
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", {
                      minLength: {
                        value: 3,
                        message: "El nombre debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message: "El nombre no debe exceder los 30 caracteres",
                      },
                      required: "El nombre es requerido",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nombres"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
                  <label
                    htmlFor="surnames"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="surnames"
                    id="surnames"
                    {...register("surnames", {
                      required: "El apellido es requerido",
                      minLength: {
                        value: 3,
                        message: "El Apellido debe tener al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          "El Apellido no debe exceder los 30 caracteres",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Apellidos"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="surnames"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
                  <label
                    htmlFor="rut"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    RUT
                  </label>
                  <input
                    type="text"
                    name="rut"
                    id="rut"
                    {...register("rut", {
                      required: "El RUT es requerido",
                    })}
                    value={rutFormatter}
                    onChange={(e) => {
                      let rutFormateado = formatearRut(e.target.value);
                      setrutFormatter(rutFormateado || e.target.value);
                    }}
                    maxLength={13}
                    autoComplete="new-off"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="11.111.111-2"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="rut"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "El email es requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Dirección de correo electrónico no válida",
                      },
                    })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
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
                      minLength: {
                        value: 8,
                        message:
                          "La contraseña debe tener al menos 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "La contraseña no debe exceder los 20 caracteres",
                      },
                    })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1 m-0">{message}</p>
                    )}
                  />
                </div>
                <div className="w-full mb-4 md:w-1/2 lg:w-1/3">
                  <label
                    htmlFor="password_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    {...register("password_confirmation", {
                      required: "La confirmación de contraseña es requerida",
                      minLength: {
                        value: 8,
                        message:
                          "La confirmación de contraseña debe tener al menos 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message:
                          "La confirmación de contraseña no debe exceder los 20 caracteres",
                      },
                      validate: (value) => {
                        const { password } = getValues();
                        return (
                          password === value || "Las contraseñas no coinciden!"
                        );
                      },
                    })}
                    name="password_confirmation"
                    id="confirm-password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password_confirmation"
                    render={({ message }) => (
                      <p className="text-red-500 mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    {...register("terms_and_conditions", {
                      required: "Debes aceptar los terminos y condiciones",
                    })}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-pink-500 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Acepto los{" "}
                    <a
                      className="font-medium text-pink-600 hover:underline dark:text-pink-500"
                      href="/"
                    >
                      Terminos y condiciones
                    </a>
                  </label>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <ErrorMessage
                  errors={errors}
                  name="terms_and_conditions "
                  render={({ message }) => (
                    <p className="text-red-500">{message}</p>
                  )}
                />
              </div>
              <div className="flex w-full justify-center">
                <button
                  type="submit"
                  className="w-1/3 flex justify-center items-center text-white bg-pink-500 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    aria-hidden="true"
                    className={` w-5 h-5 mr-2 ${
                      queryRegister.isPending ? "flex" : "hidden"
                    }   justify-start text-gray-200 animate-spin dark:text-gray-600 fill-blue-600`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  Crear cuenta
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-medium text-pink-500 hover:underline dark:text-primary-500"
                >
                  Entra
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
