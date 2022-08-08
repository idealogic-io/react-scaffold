const URL = process.env.REACT_APP_URL;

export const getDefaultMeta = t => {
  return {
    title: t("Scaffold"),
    description: t("The greatest scaffold"),
    image: `${URL}/logo512.png`,
  };
};

export const getCustomMeta = (path, t) => {
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
