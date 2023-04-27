import { lazyLoad } from "utils/helpers/loadable";

export const LoginPage = lazyLoad(
  () => import("./login"),
  module => module.default,
);

export const LandingPage = lazyLoad(
  () => import("./landing"),
  module => module.default,
);

export const HomePage = lazyLoad(
  () => import("./home"),
  module => module.default,
);
