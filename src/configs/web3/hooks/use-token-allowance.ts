import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";

import { CurrencyAmount, Token } from "../entities";
import { useTokenContract } from "./use-contract";
import { useSingleCallResult } from "configs/web3";

/**
 * Allowance refers to a permission granted by the owner of a digital asset or smart contract to another address or entity to access or use a certain amount of that asset
 * Note: BigNumber.js
 */
export const useTokenAllowance = (token?: Token, owner?: string, spender?: string) => {
  const contract = useTokenContract(token?.address, false);

  const result: EthersBigNumber = useSingleCallResult(
    contract,
    "allowance",
    owner && spender ? [owner, spender] : undefined,
  ).result?.[0];

  const allowance = token && result ? new CurrencyAmount(token, result) : undefined;

  return { allowance };
};
