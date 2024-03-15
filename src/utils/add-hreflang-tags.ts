import { EN } from "configs";

import { Language } from "context/language-context/types";
import { cutLocaleFromRoute } from "./pathname-helpers";

export const addLangHrefLink = (languages: Language[], pathname: string) => {
  const head: HTMLHeadElement = document.getElementsByTagName("head")[0];

  // before move from page to page, remove all old link with hreflang
  const allHrefLangElements = document.querySelectorAll("link[hreflang]");
  allHrefLangElements.forEach(link => link.remove());

  const correctPath = cutLocaleFromRoute(pathname);

  const linkElement = document.createElement("link");

  linkElement.setAttribute("href", `${process.env.REACT_APP_URL}${correctPath}`);
  linkElement.setAttribute("hreflang", "x-default");
  linkElement.setAttribute("rel", "alternate");

  head.appendChild(linkElement);

  return languages.forEach(({ locale }) => {
    const languageCode = locale === EN.locale ? "" : `/${locale}`;
    const rel = "alternate";
    const href = `${process.env.REACT_APP_URL}${languageCode}${correctPath}`;

    const linkElement = document.createElement("link");
    linkElement.setAttribute("href", href);
    linkElement.setAttribute("hreflang", locale);
    linkElement.setAttribute("rel", rel);

    head.appendChild(linkElement);
  });
};
