import React, { createContext, useContext, useState } from "react";

import darkTheme from "theme/dark";
import lightTheme from "theme/light";

import { LOCAL_STORAGE_KEYS } from "configs";

const ThemeContext = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const defaultLSValue = localStorage.getItem(LOCAL_STORAGE_KEYS.isDark) ?? "false";
  const defaultValue = JSON.parse(defaultLSValue);
  const [isDark, setIsDark] = useState(defaultValue);

  const theme = isDark ? darkTheme : lightTheme;

  const context = {
    theme,
    toggleTheme,
  };

  function toggleTheme() {
    const lcValue = JSON.stringify(!isDark);
    localStorage.setItem(LOCAL_STORAGE_KEYS.isDark, lcValue);

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
