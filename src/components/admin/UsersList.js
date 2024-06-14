import React from "react";
import { ThemeContext } from "../DarkTheme";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Button from "react-bootstrap/Button";
import "../../styles/UserList.scss";

function UsersList() {
  const { darkMode } = React.useContext(ThemeContext);

  //if there is an error from api it will return a div with an error, line 112
  const [error, setError] = useState(null);

  // filtering users by clicking on remove btn
  const [selectedUsers, setSelectedUsers] = useState([]);

  // filtering users by groups
  const [selectedUserGroup, setSelectedUserGroup] = useState("all");
  //my idea: to show a fetched group of 10 users with selected fetched data.
  //Include group, isActive from the array below to UserInfo. Leave sorting by group.
  const users = [
    {
      group: "admin",
      isActive: true,
    },
    {
      group: "user",
      isActive: false,
    },
    {
      group: "user",
      isActive: false,
    },
    {
      group: "user",
      isActive: true,
    },
    {
      group: "moderator",
      isActive: true,
    },
    {
      group: "moderator",
      isActive: true,
    },
    {
      group: "admin",
      isActive: true,
    },
    {
      group: "moderator",
      isActive: false,
    },
    {
      group: "user",
      isActive: false,
    },
    {
      group: "user",
      isActive: false,
    },
  ];

  //fetching users from api with useEffect
  useEffect(() => {
    //show 10 users
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network issue");
        }
        return response.json();
      })
      .then((json) => {
        const fetchedUsers = json.results.map((user, index) => ({
          // adding fetched data
          ...user,
          // adding group and isActive from array users
          group: users[index].group,
          isActive: users[index].isActive,
        }));

        setSelectedUsers(fetchedUsers);
      })
      .catch((error) => {
        console.log("error");
        setError(error.toString());
      });
  }, []);

  const groupFilterOnClick = (group) => {
    setSelectedUserGroup(group);
  };
  const usersFiltered =
    selectedUserGroup === "all"
      ? selectedUsers
      : selectedUsers.filter((user) => user.group === selectedUserGroup);

  const removeUserOnClick = (userId) => {
    setSelectedUsers((users) => users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <div
        id="buttons"
        className="d-flex flex-wrap justify-content-center gap-4 m-4"
      >
        <Button onClick={() => groupFilterOnClick("all")}>All</Button>
        <Button onClick={() => groupFilterOnClick("admin")}>Admin</Button>
        <Button onClick={() => groupFilterOnClick("user")}>User</Button>
        <Button onClick={() => groupFilterOnClick("moderator")}>
          Moderator
        </Button>
      </div>
      {error && (
        <div className="text-danger d-flex justify-content">Error: {error}</div>
      )}
      <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4 m-0 UserList">
        {/* show first 10 users */}
        {usersFiltered.slice(0, 10).map((user) => (
          // not every user has a unique id from this api. so i used this instead
          <li key={user.login.uuid}>
            <UserInfo
              user={user}
              onDelete={removeUserOnClick}
              darkMode={darkMode}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
