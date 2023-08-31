import { Contract, ContractInterface } from "@ethersproject/contracts";
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

import { getProviderOrSigner } from "utils/web3";
import { contractsAddresses } from "configs";
import { getContract } from "./helpers";

import { Erc20, Multicall } from "configs/abi/types";

import ERC20_ABI from "configs/abi/erc20.json";
import MULTICALL_ABI from "configs/abi/multicall.json";

/**
 * Is used to instantiate a contract instance and provide it to a component for interacting with a smart contract
 * @returns null or contract
 */
const useContract = <T extends Contract = Contract>(
  address: string | undefined,
  ABI: ContractInterface,
  withSignerIfPossible = true,
): T | null => {
  // Even if we don't connect to wallet we can still connect to StaticRpcProvider
  // Which will be called with REACT_APP_CHAIN_ID. For that purpose we need useActiveWeb3React hook.
  //TODO check here
  const { provider, account, chainId } = useWeb3React();

  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(provider!, account) : null),
    [withSignerIfPossible, provider, account],
  );

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? provider : true),
    [address, ABI, provider, withSignerIfPossible],
  );

  return useMemo(() => {
    if (!canReturnContract) {
      return null;
    }

    try {
      return getContract(address!, ABI, signer, chainId!);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [address, ABI, signer, canReturnContract, chainId]) as T;
};

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
// If u need to listen to events on default chain id without wallet
// You need to replace in useMulticallUpdater useWeb3React to useActiveWeb3React
export function useMulticallContract(chainId?: number) {
  return useContract<Multicall>(chainId ? contractsAddresses.multicall[chainId] : undefined, MULTICALL_ABI, false);
}
