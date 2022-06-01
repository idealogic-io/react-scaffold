import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { getRpcUrl } from "./web3-react";

const RPC_URL = getRpcUrl();

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);
