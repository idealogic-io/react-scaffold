import { TranslateFunction } from "context/language-context/types";
import { ROUTES } from "router/routes";
import { removeTrailingSlashIfExists } from "utils/pathname-helpers";

const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = (t: TranslateFunction) => {
  return {
    title: t("New Scaffold"),
    description: t("This description should rewrite description from index.html"),
    image: `${URL}/logo512.png`,
    keywords: "new, keys, rewritten",
  };
};

export const getCustomMeta = (path: string, t: TranslateFunction) => {
  const basePath = removeTrailingSlashIfExists(path);

  switch (basePath) {
    case ROUTES.login: {
      return {
        ...getDefaultMeta(t),
        title: t("Login"),
      };
    }
    case ROUTES.home: {
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
