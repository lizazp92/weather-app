import React, { useState, useEffect } from "react";

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  // state to darkMode
  const [darkMode, setDarkMode] = useState(false);

  // I added class to the body because otherwise only div's bg color would change
  // I'm so not sure if that's an ok approach
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("App-dark-theme");
    } else {
      document.body.classList.remove("App-dark-theme");
    }
  }, [darkMode]);

  //for button toggling dark theme
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
