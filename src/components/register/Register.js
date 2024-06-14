import React from "react";
import { ThemeContext } from "../DarkTheme";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import "../../styles/Register.scss";
import "../../styles/Login.scss";

function Register({ handleRegister, handleShowLogin }) {
  const { darkMode } = React.useContext(ThemeContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    country: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryError, setCountryError] = useState("");

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    //to check the digits
    const containsNumbers = /\d/;

    switch (name) {
      case "username":
        if (containsNumbers.test(value)) {
          setUsernameError("Username should not contain numbers");
        } else if (value.length <= 2) {
          setUsernameError("Should be at least 2 characters long");
        } else if (value.length >= 10) {
          setUsernameError("Should be no more than 10 characters long");
        } else {
          setUsernameError("");
        }
        break;
      case "password":
        if (value.length <= 5) {
          setPasswordError("Should be at least 6 characters long");
        } else {
          setPasswordError("");
        }
        break;
      case "firstName":
        if (containsNumbers.test(value)) {
          setFirstNameError("First name should not contain numbers");
        } else if (value.length <= 3) {
          setFirstNameError("Should be at least 3 characters long");
        } else if (value.length >= 10) {
          setFirstNameError("Should be no more than 10 characters long");
        } else {
          setFirstNameError("");
        }
        break;
      case "country":
        if (containsNumbers.test(value)) {
          setCountryError("Country should not contain numbers");
        } else if (value.length <= 4) {
          setCountryError("Should be at least 5 characters long");
        } else {
          setCountryError("");
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // if there are no errors after submitting a form (i feel so clever after this lmao),
    // pass username's value to handleRegister
    if (!usernameError && !passwordError && !firstNameError && !countryError) {
      handleRegister(formData.username);
    }
  };

  return (
    <section className="Register">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label className="form-label">Create username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={changeHandler}
              value={formData.username}
              className={`Register-input ${
                darkMode ? "Register-input-dark-mode" : ""
              }`}
              isInvalid={usernameError !== ""}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {usernameError || "Please provide a username"}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label>Create password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={changeHandler}
              value={formData.password}
              className={`Register-input ${
                darkMode ? "Register-input-dark-mode" : ""
              }`}
              isInvalid={passwordError !== ""}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError || "Please provide a password"}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label className="form-label">Your first name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              name="firstName"
              onChange={changeHandler}
              value={formData.firstName}
              className={`Register-input ${
                darkMode ? "Register-input-dark-mode" : ""
              }`}
              isInvalid={firstNameError !== ""}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {firstNameError || "Please provide your first name"}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label className="form-label">Your country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Country"
              name="country"
              onChange={changeHandler}
              value={formData.country}
              className={`Register-input ${
                darkMode ? "Register-input-dark-mode" : ""
              }`}
              isInvalid={countryError !== ""}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type="invalid">
              {countryError || "Please provide your country"}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Register</Button>
        <Button variant="link" onClick={handleShowLogin}>
          Log in
        </Button>
      </Form>
    </section>
  );
}

export default Register;
