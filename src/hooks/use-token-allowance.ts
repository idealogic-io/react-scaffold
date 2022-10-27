import { Token, TokenAmount } from "@pancakeswap/sdk";
import { useSingleCallResult } from "./multicall";
import { useTokenContract } from "./use-contract";

export const useTokenAllowance = (token?: Token, owner?: string, spender?: string) => {
  const contract = useTokenContract(token?.address, false);

  const allowance = useSingleCallResult(contract, "allowance", [owner, spender]).result;

  return token && allowance ? new TokenAmount(token, allowance.toString()) : undefined;
};
