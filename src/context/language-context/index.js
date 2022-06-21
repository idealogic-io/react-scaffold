import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

import { EN, languages, LOCAL_STORAGE_KEYS } from "configs";
import { fetchLocale, getLanguageCodeFromLS, translatedTextIncludesVariable } from "./helpers";

const initialState = {
  isFetching: true,
  currentLanguage: EN,
};

const langKey = LOCAL_STORAGE_KEYS.language;

export const languageMap = new Map();
// languageMap.set(EN.locale, translations)

const LanguageContext = createContext(null);
// function to translate text not in components
// Usage: const translate = t(language);
//        translate("Some Text")
export const t = currentLanguage => key => {
  const translationSet = languageMap.get(currentLanguage.locale) ?? languageMap.get(EN.locale);
  const translatedText = translationSet && translationSet[key] ? translationSet[key] : key;

  return translatedText;
};

const LanguageContextProvider = ({ fallback, children }) => {
  const [state, setState] = useState(() => {
    const codeFromStorage = getLanguageCodeFromLS();

    return {
      ...initialState,
      currentLanguage: codeFromStorage in languages ? languages[codeFromStorage] : EN,
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

  const changeLanguage = useCallback(async language => {
    if (!languageMap.has(language.locale)) {
      setState(prevState => ({
        ...prevState,
        isFetching: true,
      }));

      const locale = await fetchLocale(language.locale);
      if (locale) {
        const enLocale = languageMap.get(EN.locale);
        languageMap.set(language.locale, { ...enLocale, ...locale });
      }

      localStorage?.setItem(langKey, language.locale);

      setState(prevState => ({
        ...prevState,
        isFetching: false,
        currentLanguage: language,
      }));
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

      const translatedText = translationSet && translationSet[key] ? translationSet[key] : key;

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

  if (state.isFetching && fallback) {
    return fallback;
  }

  return (
    <LanguageContext.Provider value={{ ...state, changeLanguage, t: translate }}>{children}</LanguageContext.Provider>
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
