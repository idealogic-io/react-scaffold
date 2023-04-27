import { Zero } from "@ethersproject/constants";
import { formatUnits } from "@ethersproject/units";
import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";

import BigNumber from "bignumber.js";

import { useSingleCallResult, useTokenContract } from "hooks";
import { Token } from "types/token";
/**
 * Allowance refers to a permission granted by the owner of a digital asset or smart contract to another address or entity to access or use a certain amount of that asset
 * Note: BigNumber.js
 */
export const useTokenAllowance = (token: Token, owner?: string, spender?: string) => {
  const contract = useTokenContract(token.address, false);

  const allowance: EthersBigNumber =
    useSingleCallResult(contract, "allowance", owner && spender ? [owner, spender] : undefined).result?.[0] || Zero;

  return BigNumber(formatUnits(allowance.toString(), token.decimals));
};
