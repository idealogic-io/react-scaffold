import React, { createContext, useContext, useState } from "react";

import darkTheme from "theme/dark";
import lightTheme from "theme/light";

import { LOCAL_STORAGE_KEYS } from "configs";

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const defaultValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.isDark)) ?? false;
  const [isDark, setIsDark] = useState(defaultValue);

  const theme = isDark ? darkTheme : lightTheme;

  const context = {
    theme,
    toggleTheme,
  };

  function toggleTheme() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.isDark, !isDark);
    setIsDark(!isDark);
  }

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  if (themeContext === null) {
    throw new Error("Theme context is not found");
  }
  return themeContext;
};

export default ThemeContextProvider;
