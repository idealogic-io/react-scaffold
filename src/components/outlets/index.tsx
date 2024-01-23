import { lazyLoad } from "utils";
import { Loader } from "components";

export const DefaultOutlet = lazyLoad(
  () => import("./default-outlet"),
  module => module.default,
  { fallback: <Loader /> },
);
