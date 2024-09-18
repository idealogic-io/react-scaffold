import { Language } from "context/language-context/types";

export const EN: Language = { locale: "en-US", language: "English", code: "en" };
export const UA: Language = { locale: "ua-UA", language: "Українська", code: "ua" };

export const languages = {
  "en-US": EN,
  "ua-UA": UA,
};

export const languageList = Object.values(languages);
