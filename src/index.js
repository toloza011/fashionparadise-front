import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Collapse, Dropdown, Ripple, Carousel, initTE } from "tw-elements";
import "react-slideshow-image/dist/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
initTE({ Collapse, Dropdown, Ripple, Carousel });
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
