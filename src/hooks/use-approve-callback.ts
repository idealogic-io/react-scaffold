import { useCallback, useMemo } from "react";
import { MaxUint256 } from "@ethersproject/constants";
import { TokenAmount, CurrencyAmount } from "@pancakeswap/sdk";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

import { useTranslation } from "context";

import { useTokenAllowance, useHasPendingApproval, useTransactionAdder, useTokenContract } from "hooks";
import { getErrorMessage, NATIVE_ADDRESS } from "utils/web3";

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export const useApproveCallback = (
  amountToApprove?: CurrencyAmount,
  spender?: string,
): [ApprovalState, () => Promise<void>] => {
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const token = amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
  const currentAllowance = useTokenAllowance(token, account ?? undefined, spender);
  const pendingApproval = useHasPendingApproval(token?.address, spender);

  // check the current approval status
  const approvalState: ApprovalState = useMemo(() => {
    if (!amountToApprove || !spender) {
      return ApprovalState.UNKNOWN;
    }
    if (token?.address?.toLowerCase() === NATIVE_ADDRESS) {
      return ApprovalState.APPROVED;
    }
    // we might not have enough data to know whether or not we need to approve
    if (!currentAllowance) {
      return ApprovalState.UNKNOWN;
    }

    // amountToApprove will be defined if currentAllowance is
    return currentAllowance.lessThan(amountToApprove)
      ? pendingApproval
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [amountToApprove, currentAllowance, pendingApproval, spender]);

  const tokenContract = useTokenContract(token?.address);
  const addTransaction = useTransactionAdder();

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      toast.error(t("Approve was called unnecessarily"));
      console.error("approve was called unnecessarily");
      return;
    }
    if (!token) {
      toast.error(t("No token"));
      console.error("no token");
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
      const amount = useExact ? amountToApprove.raw.toString() : MaxUint256;
      const response = await tokenContract.approve(spender, amount);
      addTransaction(response, {
        summary: `Approve ${amountToApprove.currency.symbol}`,
        approval: { tokenAddress: token.address, spender },
        type: "approve",
      });
    } catch (error: any) {
      console.error(`Approval failed: `, error);
      toast.error(t("Approval failed: %message%", { message: getErrorMessage(error) }));
    }
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, t]);

  return [approvalState, approve];
};
