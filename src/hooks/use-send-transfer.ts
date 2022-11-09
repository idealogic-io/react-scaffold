import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import { Web3Provider } from "@ethersproject/providers";

import { useTranslation } from "context";

import { useTokenContract, useTransactionAdder } from "hooks";
import { getErrorMessage, NATIVE_ADDRESS, truncateHash } from "utils/web3";

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
        summary: `Transfer to ${truncateHash(to)}`,
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
