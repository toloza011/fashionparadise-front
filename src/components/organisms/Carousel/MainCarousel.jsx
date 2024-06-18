import React from "react";
import Banner1 from "../../../assets/img/banner-1.jpg";
import Banner2 from "../../../assets/img/banner-2.jpg";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const MainCarousel = (props) => {
  return (
    <Slide infinite={true} slidesToShow={1} responsive={true}>
      <div className="each-slide-effect mx-2 ">
        <div
          style={{
            backgroundImage: `url(${Banner1})`,
            objectFit: "cover",
            height: "500px",
            width: "100%",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      <div className="each-slide-effect mx-2">
        <div
          style={{
            backgroundImage: `url(${Banner2})`,
            objectFit: "cover",
            height: "500px",
            width: "100%",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </Slide>
  );
};

export default MainCarousel;
