import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formatMoney } from "../../../helpers/Helpers";
import { Link } from "react-router-dom";

const SearchBoxFloat = ({ setopenSearchBox, openSearchBox }) => {
  const cancelButtonRef = useRef(null);

  const [results, setResults] = useState([]);
  const [loadingResult, setloadingResult] = useState(false)


  useEffect(() => {
    setloadingResult(false)
    setResults([])
  }, [openSearchBox])
  

  const onChangeSearchBox = (term) => {
    if(term.length > 0) {
      setloadingResult(true);
      setTimeout(() => {
        setloadingResult(false);
      }, 1000);
      setResults([
        {
          id: 1,
          name: "Camiseta roja",
          price: "20000",
          stock: 200,
          marca: "Adidas",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },
        {
          id: 2,
          name: "Camiseta verde",
          price: 23000,
          stock: 200,
          marca: "Nike",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },
        {
          id: 3,
          name: "Camiseta verde",
          price: 23000,
          stock: 200,
          marca: "Nike",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },
        {
          id: 4,
          name: "Camiseta verde",
          price: 23000,
          stock: 200,
          marca: "Nike",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },
        {
          id: 5,
          name: "Camiseta verde",
          price: 23000,
          stock: 200,
          marca: "Nike",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },

        {
          id: 6,
          name: "Camiseta verde",
          price: 23000,
          stock: 200,
          marca: "Nike",
          urlImg:
            "https://jumbocolombiaio.vtexassets.com/arquivos/ids/212519/7701977052674-1.jpg",
        },
      ])
    }else {
      setResults([])
    }
  }

  return (
    <Transition.Root show={openSearchBox} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setopenSearchBox}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center md:items-start sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <form>
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar productos,marcas..."
                        required
                        autoComplete="off"
                        onChange={(e) => onChangeSearchBox(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="text-white absolute right-2.5 bottom-2.5 bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Buscar
                      </button>
                    </div>
                  </form>
                  {
                      loadingResult && (
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            Cargando...
                        </div>
                      )
                  }
                  {
                    results.length > 0 && !loadingResult && (
                      <div className="bg-white px-4 py-3 pb-4 pt-5 sm:p-6 sm:pb-4 max-h-[450px] overflow-y-scroll">
                      <ul className="divide-y divide-gray-100">
                        {results.map((result) => (
                          <Link
                            to={`/product/${result.id}`}
                            key={result.id}
                            onClick={() => setopenSearchBox(false)}
                            className="flex justify-between gap-x-6 py-5 px-3 cursor-pointer hover:bg-gray-200"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <img
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                src={result.urlImg}
                                alt=""
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                  {result.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                  {result.marca}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                              <p className="text-sm leading-6 text-gray-900">
                                {formatMoney(result.price)}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <li
                            className="flex justify-between gap-x-6 py-5"
                          >
                            <div className="flex min-w-0 gap-x-4">
                            
                              <div className="min-w-0 flex-auto">
                                <button type="button" className="text-sm font-semibold leading-6 hover:text-pink-500 text-gray-900">
                                 Ver mas resultados
                                </button>
                              </div>
                            </div>
                           
                          </li>
                      </ul>
                    </div>
                    )
                  }
               
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SearchBoxFloat;
