import React, { useState, useEffect } from "react";
import "../stylesheets/general.css";
import "../stylesheets/LoadingLogo.css";
import icon from "../img/loading-icon-png-24.png";

function LoadingLogo() {
  const [currentLogo, setCurrentLogo] = useState("");

  useEffect(() => {
    const logos = ["loadingLogo1", "loadingLogo2", "loadingLogo3"];
    // Selecciona un logo aleatoriamente al montar el componente
    const randomLogo = logos[Math.floor(Math.random() * (logos.length + 1))];
    setCurrentLogo(randomLogo);
  }, []); // [] asegura que solo se ejecute al montar el componente

  return (
    <div className="loading-container">
      <div className="logo-spinner">
        <div alt="Loading Logo"></div>

        <img src={icon} alt="Loading Logo" className="logo" />
      </div>
      {/* <img src={currentLogo} alt="Loading Logo"  />  */}
      <div alt="Loading Logo" className={currentLogo}>
        <p>{currentLogo}</p>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default LoadingLogo;
