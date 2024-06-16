import React, { useRef, useContext } from "react";
import { ThemeContext } from "../DarkTheme";
import { IoIosArrowForward } from "react-icons/io";
import Button from "react-bootstrap/Button";
import "../../styles/Main.scss";

function Main({ setCurrentCity }) {
  //accessing darkMode through ThemeContext
  const { darkMode } = useContext(ThemeContext);
  // create reference to the input
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    // on form submit get the current value from the input using ref
    const currentCity = inputRef.current.value;
    setCurrentCity(currentCity);
    // Clear input field after submit
    inputRef.current.value = "";
  };

  return (
    <div className={`Main ${darkMode ? "dark-mode" : ""}`}>
      <div className="Main-form-container">
        <form
          className="Main-chooseCityForm"
          id="Main-chooseCityForm"
          onSubmit={handleSubmit}
        >
          <label htmlFor="chooseCity"></label>
          <input
            type="text"
            placeholder="Choose a city"
            id="chooseCity"
            name="chooseCity"
            ref={inputRef}
            className={`Main-chooseCityForm-input-text ${
              darkMode ? "Main-chooseCityForm-input-text-dark-mode" : ""
            }`}
          />
          <Button
            variant="success"
            id="chooseCityBtn"
            type="submit"
            className="Main-chooseCityForm-btn"
          >
            <span className="Main-chooseCityForm-btn-icon">
              <IoIosArrowForward />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Main;
