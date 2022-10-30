import { Web3Provider } from "@ethersproject/providers";
import { BigNumber } from "@ethersproject/bignumber";
import { TokenAmount } from "@pancakeswap/sdk";
import { NATIVE_ADDRESS } from "configs";
import { formatUnits } from "@ethersproject/units";

// account is not optional
export const getSigner = (library: Web3Provider, account: string) => {
  return library.getSigner(account).connectUnchecked();
};

// account is optional
export const getProviderOrSigner = (library: Web3Provider, account?: string | null | undefined) => {
  return account ? getSigner(library, account) : library;
};

export const isExceededBalance = ({
  tokenAmount,
  nativeBalance,
  gasEstimation,
  value,
}: {
  tokenAmount: TokenAmount | undefined;
  nativeBalance: BigNumber;
  gasEstimation: BigNumber;
  value: string;
}) => {
  if (!tokenAmount) {
    return true;
  }

  const _nativeBalance = +formatUnits(nativeBalance);
  const _gasEstimation = +formatUnits(gasEstimation);
  const _value = +value;
  const _amount = +tokenAmount.toSignificant();
  const isNative = tokenAmount.token.address.toLowerCase() === NATIVE_ADDRESS;

  if (isNative) {
    return _gasEstimation + _value > _nativeBalance;
  } else {
    return _amount < _value || _nativeBalance < _gasEstimation;
  }
};
