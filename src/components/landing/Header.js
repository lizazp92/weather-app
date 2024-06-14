import React from "react";
import { ThemeContext } from "../DarkTheme";
import "../../styles/Header.scss";

function Header({ username }) {
  const { darkMode } = React.useContext(ThemeContext);
  return (
    <header className="Header">
      <h1
        className={`Header-title ${darkMode ? "Header-title-dark-mode" : ""}`}
      >
        Greeting App. Hello, {username}!
      </h1>
    </header>
  );
}

export default Header;

//todo: change header color and input bg on dark theme
// className={darkMode ? "dark-mode" : ""
// <Card className={`UserInfo-card ${darkMode ? "dark-mode" : ""}`}>
