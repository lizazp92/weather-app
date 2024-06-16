import React from "react";
import { useState } from "react";
import { ThemeContext, ThemeProvider } from "./components/DarkTheme";
import { Space, Switch } from "antd";
import Landing from "./components/landing/Landing";
import "./styles/App.scss";

function App() {
  // state for managing current city in input
  const [currentCity, setCurrentCity] = useState("");

  return (
    //passing darkMode, toggleTheme to nested components
    <ThemeProvider>
      {/* accessing darkMode, toggleTheme */}
      <ThemeContext.Consumer>
        {({ darkMode, toggleTheme }) => (
          <div className={`App ${darkMode ? "App-dark-theme" : ""}`}>
            {/* imported switch from ant design */}
            <Space direction="vertical" className="App-btn-theme-toggle">
              <Switch
                checked={darkMode}
                checkedChildren="Dark theme"
                unCheckedChildren="Light theme"
                onChange={toggleTheme}
              />
            </Space>
            {/* passing the current city and setCity to update it */}
            <Landing
              currentCity={currentCity}
              setCurrentCity={setCurrentCity}
            />
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
