import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

import { getContract, getProviderOrSigner } from "utils/web3";

import ERC20_ABI from "configs/abi/erc20.json";
import MULTICALL_ABI from "configs/abi/multicall.json";

import { Erc20, Multicall } from "configs/abi/types";
import { contractsAddresses } from "configs";

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account, chainId } = useWeb3React();
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  );

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible],
  );

  return useMemo(() => {
    if (!canReturnContract || !chainId) return null;
    try {
      return getContract(address!, ABI, signer, chainId);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer, canReturnContract, chainId]) as T;
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useMulticallContract(chainId: number | undefined) {
  const address = chainId && contractsAddresses.multicall[chainId] ? contractsAddresses.multicall[chainId] : undefined;
  return useContract<Multicall>(address, MULTICALL_ABI, false);
}
