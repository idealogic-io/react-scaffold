export type LanguageCode = (typeof languageCodes)[number];
export type Language = {
  language: string;
  flagUrl: string;
};

export const languageCodes = ["en", "ru"];

export const EN: Language = { language: "English", flagUrl: "/locales/en/flag.svg" };
export const RU: Language = { language: "Узкий", flagUrl: "/locales/ru/flag.svg" };

export const languages: Record<LanguageCode, Language> = {
  en: EN,
  ru: RU,
};

export const languageList: Language[] = Object.values(languages);
