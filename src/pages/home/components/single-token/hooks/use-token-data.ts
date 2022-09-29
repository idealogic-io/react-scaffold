import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";

import { getERC20Contract, isNullableAddress } from "utils/web3";
import { formatBigNumber } from "utils/web3";
import { nativeCurrencies } from "configs";
import { useOnBlockListener } from "hooks";

const defaultTokenData = {
  name: "",
  symbol: "",
  balance: "",
  decimals: 18,
  isLoading: false,
  isNative: false,
};

export type TokenType = typeof defaultTokenData;

const useTokenData = ({ address }: { address: string }) => {
  const { account, library, chainId } = useWeb3React();

  const { data = defaultTokenData, mutate } = useSWR<typeof defaultTokenData | void>(
    () => (account ? `${account}/useTokenData/${address}` : `useTokenData/${address}`),
    async () => {
      if (account && chainId) {
        return await getTokenData();
      }
    },
  );

  const isNativeToken = isNullableAddress(address);

  useOnBlockListener(mutate);

  const getTokenData = async () => {
    try {
      mutate({ ...data, isLoading: true }, { revalidate: false });
      const ERC20Contract = getERC20Contract(address, library.getSigner(), chainId);

      if (!isNativeToken) {
        const data = await getERC20TokenData(ERC20Contract);

        mutate({ ...data, isLoading: false }, { revalidate: false });
      } else {
        const data = await getNativeTokenData();

        mutate({ ...data, isLoading: false }, { revalidate: false });
      }
    } catch (error) {
      console.error("Error in getTokenData: ", error, address);
    }
  };

  const getERC20TokenData = async (contract: Contract) => {
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      const balanceBN = await contract.balanceOf(account);

      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      return { name, symbol, balance, decimals, isNative: false };
    } catch (error) {
      console.error("Error in getERC20TokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const getNativeTokenData = async () => {
    try {
      if (!chainId) {
        return defaultTokenData;
      }

      const { decimals, name, symbol } = nativeCurrencies[chainId];

      const balanceBN = await library.getBalance(account);

      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      return { name, symbol, balance, decimals, isNative: true };
    } catch (error) {
      console.error("Error in getNativeTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  return { data, isNativeToken, getTokenData };
};

export default useTokenData;
