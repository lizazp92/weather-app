import React, { useState, useEffect } from "react";
import { ThemeContext } from "../../DarkTheme";
import WeatherInfo from "./WeatherInfo";
import Button from "react-bootstrap/Button";
import { apiKey } from "./API";
import AlertMessage from "./AlertMessage";
import "../../styles/WeatherList.scss";

// passing input's value for which the weather data needs to be fetched
function WeatherList({ currentCity }) {
  const { darkMode } = React.useContext(ThemeContext);
  //for managing any error messages
  const [error, setError] = useState(null);
  // for storing fetched weather data
  const [weatherData, setWeatherData] = useState(null);
  // filter for current, 3-hour, 5-day
  const [filter, setFilter] = useState("current");

  // fetches weather data when currentCity changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // fetching current weather data
        const currentResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&units=metric&appid=${apiKey}`
        );
        if (!currentResponse.ok) {
          throw new Error("City not found");
        }
        const currentData = await currentResponse.json();
        // fetching data for forecats (3-h and 5 days)
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&units=metric&appid=${apiKey}`
        );
        if (!forecastResponse.ok) {
          throw new Error("City not found");
        }
        const forecastData = await forecastResponse.json();

        setWeatherData({
          current: currentData,
          hourly: forecastData.list,
        });
        setError(null);
      } catch (error) {
        console.error(error);
        //connecting alertMessage
        setError("city");
        // no data shown on error
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [currentCity]);

  // Updates the filter based on what we choose
  const handleFilterClick = (filterType) => {
    setFilter(filterType);
  };

  return (
    <div>
      {/* hide buttons if there is an error */}
      <div
        id="buttons"
        className={`d-flex flex-wrap justify-content-center gap-4 m-4 ${
          error ? "d-none" : ""
        }`}
      >
        <Button onClick={() => handleFilterClick("current")}>
          Weather now
        </Button>
        <Button onClick={() => handleFilterClick("3-hour")}>
          3-hour forecast
        </Button>
        <Button onClick={() => handleFilterClick("5-day")}>
          5 days forecast
        </Button>
      </div>
      {/* handling alert message from bootstrap */}
      <AlertMessage errorAlertMessage={error} />
      <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4 m-0 WeatherList">
        {weatherData && filter === "current" && (
          <WeatherInfo data={weatherData.current} darkMode={darkMode} />
        )}
        {weatherData &&
          filter === "3-hour" &&
          weatherData.hourly
            .slice(0, 10)
            .map((item, index) => (
              <WeatherInfo key={index} data={item} darkMode={darkMode} />
            ))}
        {weatherData &&
          filter === "5-day" &&
          weatherData.hourly
            .filter((weatherItem, index) => index % 8 === 0) // 24hours/3=8
            .slice(0, 5)
            .map((weatherItem, index) => (
              <WeatherInfo key={index} data={weatherItem} darkMode={darkMode} />
            ))}
      </ul>
    </div>
  );
}

export default WeatherList;