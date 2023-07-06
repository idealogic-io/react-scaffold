import { useCallback, useMemo } from "react";
import { MaxUint256 } from "@ethersproject/constants";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { parseUnits } from "@ethersproject/units";

import { useTranslation } from "context";

import { useTokenAllowance, useHasPendingApproval, useTransactionAdder, useTokenContract } from "hooks";
import { getErrorMessage, isTokenNative } from "utils/web3";
import { Token } from "types/token";

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
  token: Token,
  amountToApprove?: string,
  spender?: string,
): [ApprovalState, () => Promise<void>] => {
  const { account } = useWeb3React();
  const { t } = useTranslation();

  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender);
  const pendingApproval = useHasPendingApproval(token.address, spender);

  const approvalState: ApprovalState = useMemo(() => {
    if (isTokenNative(token.address)) {
      return ApprovalState.APPROVED;
    }

    if (!amountToApprove || !spender) {
      return ApprovalState.UNKNOWN;
    }

    return currentAllowance.lt(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(token.address);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      toast.error(t("Approve was called unnecessarily"));
      console.error("approve was called unnecessarily");
      return;
    }

    if (!tokenContract) {
      toast.error(t("Cannot find contract of the token %tokenAddress%", { tokenAddress: token?.address }));
      console.error("tokenContract is null");
      return;
    }

    if (!amountToApprove) {
      toast.error(t("Missing amount to approve"));
      console.error("missing amount to approve");
      return;
    }

    if (!spender) {
      toast.error(t("No spender"));
      console.error("no spender");
      return;
    }

    let useExact = false;

    // general fallback for tokens who restrict approval amounts
    try {
      await tokenContract.estimateGas.approve(spender, MaxUint256);
    } catch (error) {
      useExact = true;
    }

    try {
      const amount = useExact ? parseUnits(amountToApprove, token.decimals) : MaxUint256;

      const response = await tokenContract.approve(spender, amount);

      addTransaction(response, {
        summary: `Approve ${token.symbol}`,
        approval: { tokenAddress: token.address, spender },
        type: "approve",
      });
    } catch (error) {
      console.error(`Approval failed: `, error);
      toast.error(t("Approval failed: %message%", { message: getErrorMessage(error) }));
    }
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, t]);

  return [approvalState, approve];
};
