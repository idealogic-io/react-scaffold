import { lazyLoad } from "utils/loadable";

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

export const SwapPage = lazyLoad(
  () => import("./swap"),
  module => module.default,
);
