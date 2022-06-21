import { Language } from "context/language-context/types";

export const EN: Language = { locale: "en-US", language: "English", code: "en" };
export const RU: Language = { locale: "ru-RU", language: "Русский", code: "ru" };

export const languages = {
  "en-US": EN,
  "ru-RU": RU,
};

export const languageList = Object.values(languages);
