import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { ThemeContext } from "../../DarkTheme";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "../../styles/WeatherInfo.scss";

function WeatherInfo({ data }) {
  const { darkMode } = React.useContext(ThemeContext);
  // for showing/hiding additional info on fetched weather
  const [isVisible, setIsVisible] = useState(true);

  // if there is no data, show nothing
  if (!data || !data.weather) {
    return null;
  }

  const { weather, main, wind, clouds } = data;

  return (
    <Card
      className={`UserInfo-card ${darkMode ? "WeatherInfo-dark-theme" : ""}`}
    >
      {/* <Card.Body>
        <Card.Title className="WeatherInfo-title">{weather[0].main}</Card.Title>
      </Card.Body> */}
      <Card.Img
        variant="top"
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        className="WeatherInfo-img"
        alt="weather icon"
      />
      <Card.Body className="WeatherInfo-btn">
        <Button
          variant="info"
          onClick={() => setIsVisible(!isVisible)}
          className="WeatherInfo-btn-content"
        >
          {isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </Button>
      </Card.Body>
      {isVisible && (
        <div>
          <ListGroup className="list-group-flush">
            <ListGroup.Item
              className={darkMode ? "WeatherInfo-dark-theme" : ""}
            >
              Temp: {Math.round(main.temp)} °C
            </ListGroup.Item>
            <ListGroup.Item
              className={darkMode ? "WeatherInfo-dark-theme" : ""}
            >
              Description: {weather[0].main}
            </ListGroup.Item>
            <ListGroup.Item
              className={darkMode ? "WeatherInfo-dark-theme" : ""}
            >
              Humidity: {main.humidity} %
            </ListGroup.Item>
            <ListGroup.Item
              className={darkMode ? "WeatherInfo-dark-theme" : ""}
            >
              Wind Speed: {Math.round(wind.speed)} m/s
            </ListGroup.Item>

            <ListGroup.Item
              className={darkMode ? "WeatherInfo-dark-theme" : ""}
            >
              Cloudiness: {clouds.all} %
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </Card>
  );
}

export default WeatherInfo;
