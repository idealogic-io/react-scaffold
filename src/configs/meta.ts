import { TranslateFunction } from "context/language-context/types";
import { ROUTES } from "navigation/routes";

const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = (t: TranslateFunction) => {
  return {
    title: "",
    description: t("Project scaffold is in build progress"),
    image: `${URL}/logo512.png`,
  };
};

export const getCustomMeta = (path: string, t: TranslateFunction) => {
  switch (path) {
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
