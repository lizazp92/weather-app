import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertMessage({ errorAlertMessage }) {
  if (errorAlertMessage === "city") {
    return (
      <Alert
        variant="danger"
        // className="pt - 2"
        style={{ width: "40%", margin: "1rem auto", textAlign: "center" }}
      >
        Please provide correct city name
      </Alert>
    );
  }
  return null;
}

export default AlertMessage;
