import { lazyLoad } from "utils";
import { Loader } from "components";

const fallback = <Loader position="absolute" top="0" $backgroundColor="monochrome0" left="0" width="100%" />;

export const LoginPage = lazyLoad(
  () => import("./login"),
  module => module.default,
  { fallback },
);

export const Web3Page = lazyLoad(
  () => import("./web3"),
  module => module.default,
  { fallback },
);
