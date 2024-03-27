import { lazyLoad } from "utils";
import { Loader } from "components";

const fallback = <Loader position="absolute" top="0" $backgroundColor="monochrome0" left="0" width="100%" />;

export const LoginPage = lazyLoad(
  () => import("./login"),
  module => module.default,
  { fallback },
);

export const HomePage = lazyLoad(
  () => import("./home"),
  module => module.default,
  { fallback },
);
