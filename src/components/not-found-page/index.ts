import { lazyLoad } from "utils/helpers/loadable";

export const NotFoundPage = lazyLoad(
  () => import("./NotFoundPage"),
  module => module.default,
);
