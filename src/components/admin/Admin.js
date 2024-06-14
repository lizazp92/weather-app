import React from "react";
import { ThemeContext } from "../DarkTheme";
import UsersList from "./UsersList";
import "../../styles/Admin.scss";

function Admin({ username }) {
  const { darkMode } = React.useContext(ThemeContext);
  return (
    <div>
      <h1 className={`Admin-title ${darkMode ? "Admin-title-dark-mode" : ""}`}>
        Admin page. Hello, {username}!
      </h1>
      <UsersList darkMode={darkMode} />
    </div>
  );
}

export default Admin;
