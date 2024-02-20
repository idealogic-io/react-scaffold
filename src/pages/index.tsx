import { lazyLoad } from "utils";
import { Loader } from "components";

export const LandingPage = lazyLoad(
  () => import("./landing"),
  module => module.default,
  { fallback: <Loader /> },
);

export const ContractInteractionLvl1Page = lazyLoad(
  () => import("./contract-interaction-lvl1"),
  module => module.default,
  { fallback: <Loader /> },
);

export const NotFoundPage = lazyLoad(
  () => import("../components/not-found-page/NotFoundPage"),
  module => module.default,
);
