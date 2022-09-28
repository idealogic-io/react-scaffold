import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";

import { ToastDescriptionWithTx } from "components";
import { toastOptions } from "configs";
import { useTranslation } from "context";
import { getERC20Contract } from "utils/web3";

import { useWaitTransaction } from "hooks";
import useTokenData from "./use-token-data";

const useSendToken = ({ address }: { address: string }) => {
  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();
  const { data, toAddress, valueToSend, isNativeToken, getTokenData } = useTokenData({ address });
  const { t } = useTranslation();
  const { library, chainId } = useWeb3React();

  const onSendHandler = async () => {
    const { decimals } = data;

    const receipt = await fetchWithCatchTxError(() => {
      if (isNativeToken) {
        return sendNativeToken(decimals);
      } else {
        return sendERC20Token(decimals);
      }
    });

    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("Token sent")}</ToastDescriptionWithTx>,
        toastOptions,
      );

      getTokenData();
    }
  };

  const sendNativeToken = async (decimal: number) => {
    const value = parseUnits(valueToSend.toString(), decimal);
    if (!library) {
      return;
    }
    const signer = library?.getSigner();

    return signer.sendTransaction({
      to: toAddress,
      value,
    });
  };

  const sendERC20Token = async (decimals: number) => {
    const value = parseUnits(valueToSend.toString(), decimals);

    const ERC20Contract = getERC20Contract(address, library?.getSigner(), chainId);
    return ERC20Contract.transfer(toAddress, value);
  };

  return { sendToken: onSendHandler, pendingTx };
};

export default useSendToken;
