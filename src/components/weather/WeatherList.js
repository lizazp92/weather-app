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

  // Helper function to generate weather information based on the filter
  const generateWeatherInfo = () => {
    switch (filter) {
      case "current":
        return <WeatherInfo data={weatherData.current} darkMode={darkMode} />;
      case "3-hour":
        return (
          weatherData.hourly
            //each element is a 3-h interval. we are taking 8 of them to cover 24h
            .slice(0, 8)
            .map((item, index) => (
              <WeatherInfo key={index} data={item} darkMode={darkMode} />
            ))
        );
      case "5-day":
        //24h / 3h = 8 intervals. we select every 8th data point to show 1 card per day
        return (
          weatherData.hourly
            .filter((weatherItem, index) => index % 8 === 0)
            // first 5 data points from the array
            .slice(0, 5)
            .map((weatherItem, index) => (
              <WeatherInfo key={index} data={weatherItem} darkMode={darkMode} />
            ))
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <AlertMessage errorAlertMessage={error} />
      {/* I had a bug that if i type incorrect city name, i saw buttons rendering for split seconds
      and after that alert appeared instead of buttons. so i added conditional rendering on 
      if there are no errors and data is fetched correctly */}
      {weatherData && !error && (
        <>
          <div
            id="buttons"
            className="d-flex flex-wrap justify-content-center gap-4 m-4"
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
          <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4 m-0 WeatherList">
            {generateWeatherInfo()}
          </ul>
        </>
      )}
    </div>
  );
}

export default WeatherList;
