import React from "react";
import { ThemeContext } from "../../DarkTheme";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import WeatherList from "../weather/WeatherList";
import "../../styles/Landing.scss";

function Landing({ currentCity, setCurrentCity }) {
  //accessing darkMode through ThemeContext
  const { darkMode } = React.useContext(ThemeContext);

  return (
    <div className="Landing">
      <Header darkMode={darkMode} />
      {/* for updating main component with new city */}
      <Main setCurrentCity={setCurrentCity} />
      {/* if we have city after submit, weatherList renders with passed city property */}
      {currentCity && <WeatherList currentCity={currentCity} />}
      <Footer />
    </div>
  );
}

export default Landing;
