import React, { useRef, useState } from "react";
import { formatMoney } from "../../../helpers/Helpers";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product = {}, carouselRef, handleDragStart }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const handleCardClick = (event) => {
    if (!isDragging) {
      // Realiza acciones de clic en la tarjeta
      // carouselRef.current.setStoreState({ currentSlide: event.target.id });
      navigate(`/product/${product.id}`);
    }
    /*  if (event.type === "click" && !isDragging) {
      navigate(`/product/${product.id}`);
    } */
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    /*  <div
      className="group relative product-card flex-shrink-0"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      <div className="inner-product-card" onClick={handleCardClick}>
        <div
          title={product.name}
          className="max-w-[300px] touch-manipulation aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75"
        >
          <img
            src={product.main_image_url}
            alt={product.name}
            className="h-full w-full object-fill object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <span>{product.name}</span>
            </h3>
            <p className="mt-1 text-sm  text-gray-500">{product.brand.name}</p>
          </div>
          <p className="text-lg font-medium text-pink-500">
            {product.promotional_price !== null &&
            product.promotional_price !== 0 ? (
              <>
                <span className="text-md line-through">
                  {formatMoney(product.price)}
                </span>
                <span className="text-md ml-2">
                  {formatMoney(product.promotional_price)}
                </span>
              </>
            ) : (
              formatMoney(product.price)
            )}
          </p>
        </div>
      </div>
    </div> */
    <div className="relative m-2 w-full max-w-xs  rounded-lg h-full bg-white shadow-md">
      <div className="cursor-pointer" onClick={handleCardClick}>
        <img
          className="h-60 rounded-t-lg w-full object-contain object-center bg-white"
          src={product.main_image_url}
          alt={product.name}
        />
      </div>
      {product.promotional_price !== null &&
        product.promotional_price !== 0 && (
          <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-yellow-200 text-center text-sm text-black">
            Oferta
          </span>
        )}
      <div className="mt-4 px-5 pb-5">
        <div className="cursor-pointer" onClick={handleCardClick}>
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">
            {product.name}
          </h5>
        </div>
        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
        <div className="flex items-center justify-center">
          <div>
            {
              // Si el producto tiene precio promocional, muestra el precio promocional y el precio original tachado
              product.promotional_price !== null &&
              product.promotional_price !== 0 ? (
                <div>
                  <span className="text-2xl font-bold text-pink-500 ">
                    {formatMoney(product.promotional_price)}
                  </span>
                  <span className="text-xl font-bold ml-1 text-gray-400 line-through">
                    {formatMoney(product.price)}
                  </span>
                </div>
              ) : (
                // Si el producto no tiene precio promocional, muestra solo el precio
                <span className="text-3xl font-bold text-slate-900">
                  {formatMoney(product.price)}
                </span>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
