import React from "react";
import { ThemeContext } from "../DarkTheme";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function Landing({ username }) {
  const { darkMode } = React.useContext(ThemeContext);

  return (
    <div>
      <Header username={username} darkMode={darkMode} />
      <Main darkMode={darkMode} />
      <Footer />
    </div>
  );
}

export default Landing;
