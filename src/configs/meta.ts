import { TranslateFunction } from "context/language-context/types";

const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = (t: TranslateFunction) => {
  return {
    title: t("Scaffold"),
    description: t("The greatest scaffold"),
    image: `${URL}/logo512.png`,
  };
};

export const getCustomMeta = (path: string, t: TranslateFunction) => {
  let basePath = path;
  if (path.startsWith("/login")) {
    basePath = "login";
  } else if (path.startsWith("/home")) {
    basePath = "home";
  }

  switch (basePath) {
    case "login": {
      return {
        ...getDefaultMeta(t),
        title: t("Login"),
      };
    }
    case "home": {
      return {
        ...getDefaultMeta(t),
        title: t("Home"),
      };
    }
    default:
      return {
        ...getDefaultMeta(t),
      };
  }
};
