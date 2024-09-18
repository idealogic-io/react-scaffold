import { lazyLoad } from "utils";

export const AuthOutlet = lazyLoad(
  () => import("./auth-outlet"),
  module => module.default,
);

export const MainOutlet = lazyLoad(
  () => import("./main-outlet"),
  module => module.default,
);
