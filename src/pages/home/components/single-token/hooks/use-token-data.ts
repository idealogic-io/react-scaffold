import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { formatFixed } from "@ethersproject/bignumber";
import useSWR from "swr";

import { getERC20Contract, isNullableAddress } from "utils/web3";
import { formatBigNumber } from "utils/web3";
import { nativeCurrencies } from "configs";
import { useOnBlockListener } from "hooks";

const defaultTokenData = { name: "", symbol: "", balance: "", decimals: 18, txFee: 0, isLoading: true };

const useTokenData = ({ address }: { address: string }) => {
  const { account, library, chainId } = useWeb3React();

  const { data = defaultTokenData, mutate } = useSWR<typeof defaultTokenData | void>(
    () => `useTokenData/${address}`,
    async () => {
      if (account && chainId) {
        return await getTokenData();
      }
    },
  );

  const toAddress = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";
  const valueToSend = 0.01;
  const isNativeToken = isNullableAddress(address);

  useOnBlockListener(mutate);

  const getTokenData = async () => {
    try {
      const ERC20Contract = getERC20Contract(address, library.getSigner(), chainId);

      if (!isNativeToken) {
        const data = await getERC20TokenData(ERC20Contract);

        mutate({ ...data, isLoading: false }, { revalidate: false });
      } else {
        const data = await getNativeTokenData(ERC20Contract);

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
      const txFee = await estimateTxFee(library, decimals, contract, isNativeToken);

      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      return { name, symbol, balance, decimals, txFee };
    } catch (error) {
      console.error("Error in getERC20TokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const getNativeTokenData = async (contract: Contract) => {
    try {
      if (!chainId) {
        return defaultTokenData;
      }

      const { decimals, name, symbol } = nativeCurrencies[chainId];

      const balanceBN = await library.getBalance(account);
      const txFee = await estimateTxFee(library, decimals, contract, isNativeToken);

      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      return { name, symbol, balance, decimals, txFee };
    } catch (error) {
      console.error("Error in getNativeTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const estimateTxFee = async (
    library: Web3Provider,
    decimals: number,
    ERC20Contract: Contract,
    isNullableAddress: boolean,
  ) => {
    try {
      const value = parseUnits(valueToSend.toString(), decimals);

      const gasPriceBN = await library.getGasPrice();

      let gasLimitBN = parseUnits("0");
      if (isNullableAddress) {
        gasLimitBN = await library.estimateGas({ to: toAddress, value });
      } else {
        gasLimitBN = await ERC20Contract.estimateGas.transfer(toAddress, value);
      }

      const gasPrice = formatBigNumber(gasPriceBN);
      const gasLimit = formatFixed(gasLimitBN);

      return +gasPrice * +gasLimit;
    } catch (error) {
      return 0;
    }
  };

  return { data, toAddress, valueToSend, isNativeToken, getTokenData };
};

export default useTokenData;
