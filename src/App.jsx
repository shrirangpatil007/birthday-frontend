import React from "react";
import Ravi_image from "./assets/images/Ravi_image.jpg";
import RaviAndMe_image from "./assets/images/RaviAndMe_image.jpg";
import CountdownButton from "./assets/components/CountdownButton.jsx"
import "./App.css";

export default function App() {

  return (
    <div className="homepage">
      <img className="homepage-image" src={Ravi_image} alt="Ravi_image" />
      <CountdownButton />
    </div>
  );
}
