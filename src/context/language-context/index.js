import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

import { EN, languages, LOCAL_STORAGE_KEYS } from "configs";
import { fetchLocale, getLanguageCodeFromLS, translatedTextIncludesVariable } from "./helpers";

const initialState = {
  isFetching: true,
  currentLanguage: EN,
};

const langKey = LOCAL_STORAGE_KEYS.language;

export const languageMap = new Map();

const LanguageContext = createContext(null);

const LanguageContextProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const codeFromStorage = getLanguageCodeFromLS();

    return {
      ...initialState,
      currentLanguage: languages[codeFromStorage] || EN,
    };
  });

  const { currentLanguage } = state;

  const fetchInitialLocales = async () => {
    const codeFromStorage = getLanguageCodeFromLS();

    const currentLocale = await fetchLocale(codeFromStorage);

    if (currentLocale) {
      languageMap.set(codeFromStorage, { ...currentLocale });
    }

    localStorage?.setItem(langKey, codeFromStorage);

    setState(prevState => ({
      ...prevState,
      isFetching: false,
    }));
  };

  useEffect(() => {
    fetchInitialLocales();
  }, []);

  const setLanguage = useCallback(async language => {
    if (!languageMap.has(language.locale)) {
      setState(prevState => ({
        ...prevState,
        isFetching: true,
      }));

      fetchInitialLocales();
    } else {
      localStorage?.setItem(langKey, language.locale);
      setState(prevState => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
    }
  }, []);

  const translate = useCallback(
    (key, data) => {
      const translationSet = languageMap.get(currentLanguage.locale) ?? languageMap.get(EN.locale);
      const translatedText = translationSet[key] || key;

      // Check the existence of at least one combination of %%, separated by 1 or more non space characters
      const includesVariable = translatedTextIncludesVariable(translatedText);

      if (includesVariable && data) {
        let interpolatedText = translatedText;
        Object.keys(data).forEach(dataKey => {
          const templateKey = new RegExp(`%${dataKey}%`, "g");
          interpolatedText = interpolatedText.replace(templateKey, data[dataKey].toString());
        });

        return interpolatedText;
      }

      return translatedText;
    },
    [currentLanguage],
  );

  return (
    <LanguageContext.Provider value={{ ...state, setLanguage, t: translate }}>{children}</LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const languageContext = useContext(LanguageContext);

  if (languageContext === null) {
    throw new Error("Language context is not found");
  }

  return languageContext;
};

export default LanguageContextProvider;
