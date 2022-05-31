export const DEFAULT_META = {
  title: "Scaffold",
  description: "The greatest scaffold",
  image: "https://ru.reactjs.org/logo-og.png",
};

export const getCustomMeta = (path: string) => {
  let basePath = path;
  if (path.startsWith("/login")) {
    basePath = "/login";
  } else if (path.startsWith("/home")) {
    basePath = "/home";
  }

  switch (basePath) {
    case "/login": {
      return {
        title: "Login",
      };
    }
    case "/home": {
      return {
        title: "Home",
      };
    }
    default:
      return {
        ...DEFAULT_META,
      };
  }
};
