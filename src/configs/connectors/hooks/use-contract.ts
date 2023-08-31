import { Contract, ContractInterface } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";

import { getContract } from "configs/connectors";
import { ERC20_ABI, MULTICALL_ABI, Erc20, Multicall } from "configs/abi";
import contractsAddresses from "configs/contracts-addresses";

export const useContract = <T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true,
) => {
  const { provider, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) {
      return null;
    }

    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") {
      address = addressOrAddressMap;
    } else {
      address = addressOrAddressMap[chainId];
    }

    if (!address) {
      return null;
    }

    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T;
};

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useMulticallContract() {
  return useContract<Multicall>(contractsAddresses.multicall, MULTICALL_ABI, false);
}
