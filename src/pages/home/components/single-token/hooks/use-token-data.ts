import { useEffect, useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { parseUnits } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import { formatFixed } from "@ethersproject/bignumber";

import { getERC20Contract, isNullableAddress } from "utils/web3";
import { formatBigNumber } from "utils/web3";
import { nativeCurrencies } from "configs";

const defaultTokenData = { name: "", symbol: "", balance: "", decimals: 18, txFee: 0 };

type useTokenDataArgs = { address: string };

const useTokenData = ({ address }: useTokenDataArgs) => {
  const { account, library, chainId } = useWeb3React();

  const [tokenData, setTokenData] = useState(defaultTokenData);

  const toAddress = "0x0FCfB928AC2164Df4f61C5e140bb3D13115A1e22";
  const valueToSend = 0.01;
  const isNativeToken = isNullableAddress(address);

  useEffect(() => {
    if (account && chainId) {
      getTokenData();
    }
  }, [account, chainId]);

  const getTokenData = async () => {
    try {
      const ERC20Contract = getERC20Contract(address, library.getSigner(), chainId);

      if (!isNativeToken) {
        const { name, symbol, balance, decimals, txFee } = await getNativeTokenData(ERC20Contract);

        setTokenData({ name, symbol, balance, decimals, txFee });
      } else {
        const { name, symbol, balance, decimals, txFee } = await getCustomTokenData(ERC20Contract);

        setTokenData({ name, symbol, balance, decimals, txFee });
      }
    } catch (error) {
      setTokenData(defaultTokenData);
      console.error("Error in getTokenData: ", error, address);
    }
  };

  const getNativeTokenData = async (contract: Contract) => {
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();

      const txFee = await estimateTxFee(library, decimals, contract, isNativeToken);

      const balanceBN = await contract.balanceOf(account);
      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      return { name, symbol, balance, decimals, txFee };
    } catch (error) {
      console.error("Error in getNativeTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const getCustomTokenData = async (contract: Contract) => {
    try {
      if (!chainId) {
        return defaultTokenData;
      }

      const { decimals, name, symbol } = nativeCurrencies[chainId];

      const balanceBN = await library.getBalance(account);
      const balance = formatBigNumber(balanceBN, +decimals, +decimals);

      const txFee = await estimateTxFee(library, decimals, contract, isNativeToken);

      return { name, symbol, balance, decimals, txFee };
    } catch (error) {
      console.error("Error in getCustomTokenData: ", error, address);

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

      const txFee = +gasPrice * +gasLimit;

      return txFee;
    } catch (error) {
      return 0;
    }
  };

  return { tokenData, toAddress, valueToSend, isNativeToken, getTokenData };
};

export default useTokenData;
