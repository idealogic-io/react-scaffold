type CheckExceededBalanceArgs = {
  isNativeToken: boolean;
  balance: number;
  tokenBalance: number;
  txFee: number;
  value: number;
};

export const checkExceededBalance = ({
  isNativeToken,
  balance,
  tokenBalance,
  txFee,
  value,
}: CheckExceededBalanceArgs) => {
  if (isNativeToken) {
    return txFee + value > balance;
  } else {
    return tokenBalance < value || balance < txFee;
  }
};
