import memoize from "lodash/memoize";
import { EN, LOCAL_STORAGE_KEYS, REGEX } from "configs";

export const fetchLocale = async (locale: string) => {
  const response = await fetch(`/locales/${locale}.json`);
  if (response.ok) {
    const data = await response.json();
    return data;
  }

  console.error(`Failed to fetch locale ${locale}`, response.statusText);
  return null;
};

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LOCAL_STORAGE_KEYS.language) ?? EN.locale;

    return codeFromStorage;
  } catch {
    return EN.locale;
  }
};

export const translatedTextIncludesVariable = memoize(translatedText => {
  return !!translatedText?.match(REGEX.includesVariableRegex);
});
