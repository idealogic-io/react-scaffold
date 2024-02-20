import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { chains } from "./chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Scaffold",
  projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
  chains,
});
