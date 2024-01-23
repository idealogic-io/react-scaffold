import { TFunction } from "i18next";
import { ROUTES } from "navigation/routes";
import { removeTrailingSlashIfExists } from "utils/remove-trailing-slash-if-exist";

const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = (t: TFunction) => {
  return {
    title: "",
    description: t("Project scaffold is in build progress"),
    image: `${URL}/logo512.png`,
  };
};

export const getCustomMeta = (path: string, t: TFunction) => {
  const basePath = removeTrailingSlashIfExists(path);

  switch (basePath) {
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
