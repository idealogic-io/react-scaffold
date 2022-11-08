import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";

import { useTranslation } from "context";

import { useTokenContract, useTransactionAdder } from "hooks";
import { isGasEstimationError, isUserRejected, NATIVE_ADDRESS, TxError } from "utils/web3";
import { Web3Provider } from "@ethersproject/providers";

type UseSendTransferArgs = { address: string | undefined; to: string };

export const useSendTransfer = ({ address, to }: UseSendTransferArgs) => {
  const addTransaction = useTransactionAdder();

  const { t } = useTranslation();
  const { library, chainId } = useWeb3React();
  const contract = useTokenContract(address);

  const sendToken = async (value: BigNumber) => {
    const isNative = address?.toLowerCase() === NATIVE_ADDRESS;
    const sendHandler = isNative ? sendNativeToken : sendERC20Token;

    try {
      if (!library) {
        throw new Error("Cannot get signer");
      }
      if (!chainId) {
        throw new Error("Chain id is undefined");
      }
      if (!contract) {
        throw new Error("Contract is not deployed");
      }

      const response = await sendHandler(value);

      addTransaction(response, {
        summary: `Send token with ${address} to address ${to}`,
        type: "send",
      });
    } catch (error: any) {
      console.error(`Send failed: `, error, address, to, value);
      toast.error(t("Send failed: %message%", { message: getErrorMessage(error) }));
    }
  };

  const sendNativeToken = async (value: BigNumber) => {
    const signer = (library as Web3Provider).getSigner();

    return signer.sendTransaction({
      to,
      value,
    });
  };

  const sendERC20Token = async (value: BigNumber) => {
    return contract!.transfer(to, value);
  };

  return { sendToken };
};

const getErrorMessage = (error: Error | TxError | string) => {
  let message = "Sorry, can't perform a transaction";

  if (isUserRejected(error as Error & { code: number })) {
    message = "User rejected the request";
  } else if ((error as TxError)?.data) {
    if (isGasEstimationError(error)) {
      message = "Insufficient funds";
    } else if ((error as TxError)?.data?.message) {
      message = (error as TxError)?.data?.message;
    }
  } else if ((error as Error)?.message) {
    if (isGasEstimationError(error)) {
      message = "Insufficient funds";
    } else {
      message = (error as Error)?.message;
    }
  }

  return message;
};
