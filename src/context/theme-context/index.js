import React, { createContext, useContext, useState } from "react";

import dark from "theme/dark";
import light from "theme/light";

import { LOCAL_STORAGE_KEYS } from "configs";

const ThemeContext = createContext(null);

const themeValues = {
  light,
  dark,
};

const LIGHT = "light";
const DARK = "dark";

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const themeFromStorage = getThemeValueFromLS();

    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, themeFromStorage);
    return themeValues[themeFromStorage];
  });

  const context = {
    theme,
    toggleTheme,
  };

  function toggleTheme() {
    const themeFromStorage = getThemeValueFromLS();
    const newValue = themeFromStorage === LIGHT ? DARK : LIGHT;

    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, newValue);
    setTheme(themeValues[newValue]);
  }

  function getThemeValueFromLS() {
    let themeFromStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.theme) ?? LIGHT;

    if (!(themeFromStorage in themeValues)) {
      themeFromStorage = LIGHT;
    }

    return themeFromStorage;
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
