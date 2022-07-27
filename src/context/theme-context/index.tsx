import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { DefaultTheme } from "styled-components";

import dark from "theme/dark";
import light from "theme/light";

import { LOCAL_STORAGE_KEYS } from "configs";

type ContextType = {
  theme: DefaultTheme;
  toggleTheme: () => void;
};

const themeValues = {
  light,
  dark,
};

const LIGHT = "light";
const DARK = "dark";

const ThemeContext = createContext<ContextType | null>(null);

const ThemeContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
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

    return themeFromStorage as typeof LIGHT | typeof DARK;
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
