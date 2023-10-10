import { useMemo } from "react";
import { MaxUint256 } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

import { useTranslation } from "context";
import { Currency, CurrencyAmount, Token } from "../entities";
import { useTokenAllowance } from "./use-token-allowance";
import { useHasPendingApproval, useTransactionAdder } from "./";
import { useTokenContract } from "./use-contract";
import { WalletError, getErrorMessage } from "../utils";

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}
/**
 * Is used for approving a specific ERC20 token to be used by a specific contract
 * @param token
 * @param amountToApprove
 * @param spender
 * @returns ApprovalState and callback for approve
 */
export const useApproveCallback = (
  amountToApprove: CurrencyAmount<Currency> | undefined,
  spender: string | undefined,
): [ApprovalState, () => Promise<void>] => {
  const { account } = useWeb3React();

  const token = amountToApprove?.currency?.isToken ? amountToApprove.currency : undefined;

  const { allowance } = useTokenAllowance(token, account, spender);
  const pendingApproval = useHasPendingApproval(token?.address, spender);

  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) {
      return ApprovalState.UNKNOWN;
    }

    if (amountToApprove?.currency.isNative) {
      return ApprovalState.APPROVED;
    }

    if (!allowance) return ApprovalState.UNKNOWN;

    return allowance.amount.lt(amountToApprove.amount)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, allowance, pendingApproval, spender]);

  const { approve } = useApproval(token, amountToApprove, spender, approvalState);

  return [approvalState, approve];
};

const useApproval = (
  token: Token | undefined,
  amountToApprove: CurrencyAmount<Currency> | undefined,
  spender: string | undefined,
  approvalState: ApprovalState,
) => {
  const { t } = useTranslation();

  const tokenContract = useTokenContract(token?.address);
  const addTransaction = useTransactionAdder();

  const approve = async () => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      toast.error(t("Approve was called unnecessarily"));
      return console.error("approve was called unnecessarily");
    }

    if (!token) {
      toast.error(t("Missing token to approve"));
      return console.error("no token");
    }

    if (!tokenContract) {
      toast.error(t("Cannot find contract of the token %tokenAddress%", { tokenAddress: token?.address || "unknown" }));
      return console.error("tokenContract is null");
    }

    if (!amountToApprove) {
      toast.error(t("Missing amount to approve"));
      return console.error("missing amount to approve");
    }

    if (!spender) {
      toast.error(t("No spender"));
      return console.error("no spender");
    }

    let useExact = false;

    // general fallback for tokens who restrict approval amounts
    try {
      await tokenContract.estimateGas.approve(spender, MaxUint256);
    } catch (_) {
      useExact = true;
    }

    try {
      const amount = useExact ? amountToApprove.toEthersBigNumber() : MaxUint256;

      const response = await tokenContract.approve(spender, amount);

      addTransaction(response, {
        summary: `Approve ${token.symbol}`,
        approval: { tokenAddress: token.address, spender },
        type: "approve",
      });
    } catch (error) {
      toast.error(t("Approval failed: %message%", { message: getErrorMessage(error as WalletError) }));
      console.error("Approval failed: ", error);
    }
  };

  return { approve };
};
