import { lazyLoad } from "utils";
import { Loader } from "components";

export const LandingPage = lazyLoad(
  () => import("./landing"),
  module => module.default,
  { fallback: <Loader /> },
);
