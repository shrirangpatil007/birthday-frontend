import React from "react";
import CountdownButton from "./assets/components/CountdownButton.jsx"
import "./App.css";

export default function App() {

  return (
    <div className="homepage">
      <img className="homepage-image" src="https://github.com/shrirangpatil007/birthday-frontend/blob/main/src/assets/Images/Ravi_image.jpg?raw=true" alt="Ravi_image" />
      <CountdownButton />
    </div>
  );
}
