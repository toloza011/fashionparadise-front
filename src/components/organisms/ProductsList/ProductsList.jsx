import React, { useRef } from "react";
import ProductCard from "../../molecules/ProductCard/ProductCard";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ProductsList = ({
  title = "Tendencias",
  products = [],
  infinityScroll = true,
}) => {
  const carouselRef = useRef(null);

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100 my-3 py-2 rounded-lg">
      <div className="mx-auto max-w-2xl px-4 pt-8 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-3xl text-center font-bold tracking-tight ">
          {title}
        </h2>
        <div className="container mx-auto ">
          <div className="flex items-center justify-center w-full h-full sm:pt-8 px-4">
            {/* Carousel for desktop and large size devices */}
            <CarouselProvider
              ref={carouselRef}
              className="lg:block hidden"
              naturalSlideWidth={100}
              dragStep={1}
              isIntrinsicHeight={true}
              totalSlides={products.length / 2}
              interval={5000}
              dragEnabled={false}
              visibleSlides={2}
              step={1}
              infinite={false}
            >
              <div className="w-full relative flex items-center justify-center p-30">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute rounded-full z-30 left-0 bg-white ml-8 focus:outline-none
                   focus:bg-white p-3 focus:ring-2 focus:ring-offset-2 background-red-500 focus:ring-pink-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 8 14"
                    className=""
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                    >
                      <div className="w-full relative flex items-center justify-center overflow-hidden">
                        <div className="flex items-center gap-4 w-full">
                          {products.map((product, i) => (
                            <Slide key={i} index={i} className="outline-none">
                              <ProductCard
                                carouselRef={carouselRef}
                                product={product}
                                onDragStart={handleDragStart}
                              />
                            </Slide>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute rounded-full border z-30 right-0 bg-white focus:outline-none
                  focus:bg-white p-3 focus:ring-2 focus:ring-offset-2 background-red-500 focus:ring-pink-400 cursor-pointer"
                  id="next"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 8 14"
                    className=""
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>

            {/* Carousel for tablet and medium size devices */}
            <CarouselProvider
              className="lg:hidden md:block hidden"
              naturalSlideWidth={200}
              isIntrinsicHeight={true}
              totalSlides={products.length}
              visibleSlides={products.length / 2}
              step={1}
              infinite={true}
              dragEnabled={false}
            >
              <div className="w-full relative flex items-center justify-center">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={8}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                    >
                      <div className="w-full relative flex items-center justify-center overflow-hidden">
                        <div className="flex items-center gap-4 w-full">
                          {products.map((product, i) => (
                            <Slide key={i} index={i} className="outline-none">
                              <ProductCard
                                carouselRef={carouselRef}
                                product={product}
                                onDragStart={handleDragStart}
                              />
                            </Slide>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 
                  focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 "
                  id="next"
                >
                  <svg
                    width={14}
                    height={14}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>

            {/* Carousel for mobile and Small size Devices */}
            <CarouselProvider
              className="block md:hidden "
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={products.length}
              visibleSlides={1}
              step={1}
              infinite={infinityScroll}
              dragEnabled={false}
            >
              <div className="w-full relative flex items-center justify-center">
                <ButtonBack
                  role="button"
                  aria-label="slide backward"
                  className="absolute z-30 left-0 ml-8 bg-gray-400 rounded-full p-1 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
                  id="prev"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 1L1 7L7 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonBack>
                <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                  <Slider>
                    <div
                      id="slider"
                      className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
                    >
                      <div className="w-full relative flex items-center justify-center overflow-hidden">
                        <div className="flex items-center gap-4 w-full">
                          {products.map((product, i) => (
                            <Slide key={i} index={i} className="outline-none">
                              <ProductCard
                                carouselRef={carouselRef}
                                product={product}
                                onDragStart={handleDragStart}
                              />
                            </Slide>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
                <ButtonNext
                  role="button"
                  aria-label="slide forward"
                  className="absolute z-30 right-0 mr-4 rounded-full bg-gray-400 p-1 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  id="next"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L1 13"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>

        {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div> */}
      </div>
    </div>
  );
};

export default ProductsList;
