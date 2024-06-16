import React from "react";
import { ThemeContext } from "../DarkTheme";
import "../../styles/Header.scss";

function Header() {
  //accessing darkMode through ThemeContext
  const { darkMode } = React.useContext(ThemeContext);
  return (
    <header className="Header">
      <h1
        className={`Header-title ${darkMode ? "Header-title-dark-mode" : ""}`}
      >
        Weather App
      </h1>
    </header>
  );
}

export default Header;
