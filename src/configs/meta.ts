import { TranslateFunction } from "context/language-context/types";
import { ROUTES } from "navigation/routes";
import { removeTrailingSlashIfExists } from "utils/helpers/remove-trailing-slash-if-exist";

const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = (t: TranslateFunction) => {
  return {
    title: "",
    description: t("Project scaffold is in build progress"),
    image: `${URL}/logo512.png`,
  };
};

export const getCustomMeta = (path: string, t: TranslateFunction) => {
  let basePath = removeTrailingSlashIfExists(path);
  const matchingRoute = findMatchingRoute(basePath);

  if (basePath && !matchingRoute) {
    basePath = "/404";
  }

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
    case "/404": {
      return {
        ...getDefaultMeta(t),
        title: t("404"),
      };
    }
    default:
      return {
        ...getDefaultMeta(t),
      };
  }
};

const findMatchingRoute = (basePath: string) => {
  for (const route in ROUTES) {
    if (basePath === `/${ROUTES[route as keyof typeof ROUTES]}`) {
      return route;
    }
  }
};
