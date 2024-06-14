import Alert from "react-bootstrap/Alert";

function AlertMessage({ errorAlertMessage }) {
  switch (errorAlertMessage) {
    case "username":
      return <Alert variant="danger">Your username is incorrect.</Alert>;
    case "password":
      return <Alert variant="danger">Your password is incorrect.</Alert>;
  }
}

export default AlertMessage;
