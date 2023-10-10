import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";

import { useTranslation } from "context";
import { useTransactionAdder } from "../hooks";
import { WalletError, getErrorMessage, truncateHash } from "../utils";

type UseSendTransferArgs = { contract: Contract; to: string };
/**
 * Returns method for send crypto asset to other wallet. Works for native and non native token
 */
export const useSendTransfer = ({ contract, to }: UseSendTransferArgs) => {
  const addTransaction = useTransactionAdder();

  const { t } = useTranslation();
  const { provider, chainId } = useWeb3React();

  const sendToken = async (value: BigNumber, isNative: boolean) => {
    const sendHandler = isNative ? sendNativeToken : sendERC20Token;

    try {
      if (!provider) {
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
        summary: `Transfer to ${truncateHash(to)}`,
        type: "send",
      });
    } catch (error) {
      console.error(`Send failed: `, error, to, value);
      toast.error(t("Send failed: %message%", { message: getErrorMessage(error as WalletError) }));
    }
  };

  const sendNativeToken = async (value: BigNumber) => {
    const signer = provider!.getSigner();

    return signer.sendTransaction({
      to,
      value,
    });
  };

  const sendERC20Token = async (value: BigNumber) => {
    return contract.transfer(to, value);
  };

  return { sendToken };
};
