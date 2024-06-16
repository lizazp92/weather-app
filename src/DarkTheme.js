import React, { useState, useEffect } from "react";

// for passing darkMode and toggleTheme
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // I added the styling to the body because otherwise the bg color would not fully change.
  // this useEffect runs only when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("App-dark-theme");
    } else {
      document.body.classList.remove("App-dark-theme");
    }
  }, [darkMode]);

  // toggles the value of darkMode between true and false
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    // for children components to receive values from darkMode abd toggleTheme
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
