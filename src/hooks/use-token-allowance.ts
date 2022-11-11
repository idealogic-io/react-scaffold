import { Token, TokenAmount } from "@pancakeswap/sdk";
import { useSingleCallResult } from "./use-multicall";
import { useTokenContract } from "./use-contract";

export const useTokenAllowance = (token?: Token, owner?: string, spender?: string) => {
  const contract = useTokenContract(token?.address, false);

  const allowance = useSingleCallResult(contract, "allowance", owner && spender ? [owner, spender] : undefined).result;

  return token && allowance ? new TokenAmount(token, allowance.toString()) : undefined;
};
