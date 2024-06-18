import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatMoney } from "../../../helpers/Helpers";
import { useGetProduct } from "../../../hooks/queries/queryProducts";
import useCartStore from "../../../store/cart";

import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./ProductDetails.module.css";

const ProductDetails = (props) => {
  const [product, setproduct] = useState();
  const queryProduct = useGetProduct();
  const [imagesGallery, setimagesGallery] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [colors, setcolors] = useState([]);
  const [sizes, setsizes] = useState([]);

  const params = useParams();

  const { add } = useCartStore((state) => ({
    add: state.add,
  }));

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página al inicio
    if (
      params.productId &&
      !queryProduct.isSuccess &&
      !queryProduct.isLoading
    ) {
      setTimeout(() => {
        queryProduct.mutate(params.productId);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (queryProduct.isSuccess) {
      setproduct(queryProduct.data.data);
      setimagesGallery([
        {
          original: queryProduct.data.data.main_image_url,
          thumbnail: queryProduct.data.data.main_image_url,
          loading: "eager",
          originalHeight: "20",
          thumbnailHeight: "20px",
        },
        ...queryProduct.data.data.images.map((img) => ({
          original: img.image_url,
          thumbnail: img.image_url,
          loading: "eager",
        })),
      ]);
      const colores = queryProduct.data.data.attributes.filter(
        (attr) => attr.attribute_name.toLowerCase() === "color"
      );
      const sizes = queryProduct.data.data.attributes.filter(
        (attr) => attr.attribute_name.toLowerCase() === "size"
      );
      setcolors(colores);
      setsizes(sizes);
    }
  }, [queryProduct.data, queryProduct.isSuccess]);

  return (
    <section className="overflow-hidden px-3 font-poppins ">
      <div className="max-w-full sm:px-2 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4 ">
          <div className="w-full px-4 md:w-1/2 ">
            {(queryProduct.isPending || !product) && (
              <div className="relative w-full h-[500px]">
                <div className="grid grid-cols-4 space-x-4 gap-2 h-full w-full">
                  <div className=" col-span-1 gap-2 flex flex-col space-y-4 rounded-sm">
                    <div className="bg-gray-200 animate-pulse rounded-sm h-[180px] w-[100px]"></div>
                    <div className="bg-gray-200 animate-pulse rounded-sm h-[180px] w-[100px]"></div>
                    <div className="bg-gray-200 animate-pulse rounded-sm h-[180px] w-[100px]"></div>
                    <div className="bg-gray-200 animate-pulse rounded-sm h-[180px] w-[100px]"></div>
                  </div>
                  <div className="bg-gray-300 animate-pulse rounded-sm col-span-3 h-[700px] w-[450px]"></div>
                </div>
              </div>
            )}
            {queryProduct.isSuccess && product && (
              <div className="">
                <ReactImageGallery
                  lazyLoad
                  infinite={true}
                  showBullets={true}
                  autoPlay={true}
                  swipeThreshold={50}
                  indexSeparator=" de "
                  thumbnailPosition="left"
                  items={imagesGallery}
                  showIndex
                  originalClass="h-[400px] items-center w-full"
                  additionalClass="h-[400px] items-center w-full"
                />
              </div>
            )}
          </div>
          <div className="w-full px-4 md:w-1/2 ">
            <div className="lg:pl-20">
              <div className="mb-8 ">
                {queryProduct.isPending || !product ? (
                  <div className="animate-pulse bg-gray-300 rounded-sm h-[28px] dark:bg-gray-700 w-[200px]"></div>
                ) : (
                  <span className="text-lg font-medium text-rose-500 dark:text-rose-200">
                    {product?.brand?.name}
                  </span>
                )}

                <h2 className="max-w-xl mt-2 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {queryProduct.isPending || !product ? (
                    <div className="animate-pulse bg-gray-300 rounded-sm h-[28px] dark:bg-gray-700 w-[300px]"></div>
                  ) : (
                    product?.name
                  )}
                </h2>
                <p className="mb-6">
                  {queryProduct.isPending || !product ? (
                    <span className="animate-pulse bg-gray-300 h-6 w-full mb-6"></span>
                  ) : (
                    <span className="text-gray-700 text-sm font-medium dark:text-gray-400 mb-12">
                      SKU: {product?.sku}
                    </span>
                  )}
                </p>

                <div className="flex items-center mb-6">
                  <ul className="flex mr-2">
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </button>
                    </li>
                    <li>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                  <p className="text-xs dark:text-gray-400 ">
                    (2 customer reviews)
                  </p>
                </div>
                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {queryProduct.isPending || !product ? (
                    <span className="animate-pulse bg-gray-300 h-6 w-full"></span>
                  ) : (
                    product?.description
                  )}
                </p>
                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                  {queryProduct.isPending || !product ? (
                    <span className="animate-pulse text-gray-300 bg-gray-300 h-10 w-full">
                      loading
                    </span>
                  ) : product?.promotional_price !== null &&
                    product?.promotional_price !== 0 ? (
                    <>
                      <span>{formatMoney(product?.promotional_price)}</span>
                      <span className="text-xl line-through ml-2">
                        {formatMoney(product?.price)}
                      </span>
                    </>
                  ) : (
                    <span className="">{formatMoney(product?.price)}</span>
                  )}
                </p>
                <p className="text-green-600 dark:text-green-300 ">
                  {product?.stock} en stock
                </p>
              </div>
              {colors.length > 0 && (
                <div className="flex items-center mb-8">
                  <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                    Color:
                  </h2>
                  <div className="flex flex-wrap -mx-2 -mb-2">
                    {colors.map((color) => (
                      <button
                        key={color.id}
                        className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 "
                      >
                        <div
                          className="w-6 h-6 "
                          style={{
                            backgroundColor: `${color.attribute_value}`,
                          }}
                        ></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {sizes.length > 0 && (
                <div className="flex items-center mb-8">
                  <h2 className="w-16 mr-10 text-xl font-bold dark:text-gray-400">
                    Tamaño:
                  </h2>
                  <div className="flex flex-wrap -mx-2 -mb-2">
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400"
                      >
                        {size.attribute_value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-32 mb-8 ">
                <label
                  htmlFor=""
                  className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                >
                  Cantidad
                </label>
                <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                        setproduct({ ...product, quantity: quantity });
                      }
                    }}
                    className="w-20 h-full text-gray-600 bg-gray-200 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
                  >
                    <span className="m-auto text-2xl font-thin">-</span>
                  </button>
                  <input
                    type="number"
                    disabled
                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                    placeholder="1"
                    value={quantity}
                  />
                  <button
                    onClick={() => {
                      setQuantity(quantity + 1);
                      setproduct({ ...product, quantity: quantity });
                    }}
                    className="w-20 h-full text-gray-600 bg-gray-200 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center -mx-4 ">
                <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  <button
                    onClick={() => {
                      add({ ...product, quantity: quantity });
                    }}
                    className="flex items-center justify-center w-full p-4 text-pink-500 border border-pink-500 rounded-md dark:text-gray-200 dark:border-pink-600 hover:bg-pink-600 hover:border-pink-600 hover:text-gray-100 dark:bg-pink-600 dark:hover:bg-pink-700 dark:hover:border-pink-700 dark:hover:text-gray-300"
                  >
                    Agregar al carrito
                  </button>
                </div>
                <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                  <button className="flex items-center justify-center w-full p-4 text-pink-500 border border-pink-500 rounded-md dark:text-gray-200 dark:border-pink-600 hover:bg-pink-600 hover:border-pink-600 hover:text-gray-100 dark:bg-pink-600 dark:hover:bg-pink-700 dark:hover:border-pink-700 dark:hover:text-gray-300">
                    Agregar a la lista de deseos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
