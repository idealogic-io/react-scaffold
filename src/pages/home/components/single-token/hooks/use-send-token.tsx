import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { parseUnits } from "@ethersproject/units";

import { ToastDescriptionWithTx } from "components";
import { toastOptions } from "configs";
import { useTranslation } from "context";
import { getERC20Contract } from "utils/web3";

import { useWaitTransaction } from "hooks";

import { TokenType } from "./use-token-data";

type UseSendTokenArgs = { address: string; toAddress: string; token: TokenType };

const useSendToken = ({ address, token, toAddress }: UseSendTokenArgs) => {
  const { fetchWithCatchTxError, loading: pendingTx } = useWaitTransaction();

  const { t } = useTranslation();
  const { library, chainId } = useWeb3React();

  const sendToken = async (valueToSend: string) => {
    const receipt = await fetchWithCatchTxError(() => {
      if (token.isNative) {
        return sendNativeToken(valueToSend);
      } else {
        return sendERC20Token(valueToSend);
      }
    });

    if (receipt?.status) {
      toast.success(
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>{t("Token sent")}</ToastDescriptionWithTx>,
        toastOptions,
      );
    }
  };

  const sendNativeToken = async (valueToSend: string) => {
    const value = parseUnits(valueToSend.toString(), token.decimals);
    if (!library) {
      return;
    }
    const signer = library?.getSigner();

    return signer.sendTransaction({
      to: toAddress,
      value,
    });
  };

  const sendERC20Token = async (valueToSend: string) => {
    const value = parseUnits(valueToSend, token.decimals);

    const ERC20Contract = getERC20Contract(address, library?.getSigner(), chainId);

    return ERC20Contract.transfer(toAddress, value);
  };

  return { sendToken, pendingTx };
};

export default useSendToken;
