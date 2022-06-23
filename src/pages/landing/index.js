import { lazyLoad } from "utils/loadable";

export const LandingPage = lazyLoad(
  () => import("./LandingPage"),
  module => module.default,
);
