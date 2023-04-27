import BigNumber from "bignumber.js";
import { Token } from "types/token";

export type SingleTokenProps = {
  token: Token;
  nativeBalance: BigNumber;
};
