import { useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { toast } from "react-toastify";

import { useTranslation } from "context";
import { checkedTransaction, finalizeTransaction } from "store/transactions/actions";
import { useAppDispatch, useAppSelector } from "store/store";

import { ToastDescriptionWithTx } from "components";
import { shouldCheck } from "./helpers";
import { useCurrentBlock } from "hooks";

export const useTransactionsUpdater = () => {
  // TODO check library gere
  const { provider, chainId } = useWeb3React();
  const { t } = useTranslation();

  const currentBlock = useCurrentBlock();
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.transactions);

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);

  useEffect(() => {
    if (!chainId || !provider || !currentBlock) return;

    Object.entries(transactions)
      .filter(([hash, _]) => shouldCheck(currentBlock, transactions[hash]))
      .forEach(([hash, value]) => {
        provider
          .getTransactionReceipt(hash)
          .then(receipt => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                }),
              );

              const toastFunc = receipt.status === 1 ? toast.success : toast.error;
              const message = receipt.status === 1 ? value.summary : t("Transaction failed");

              toastFunc(<ToastDescriptionWithTx txHash={receipt.transactionHash}>{message}</ToastDescriptionWithTx>);
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }));
            }
          })
          .catch(error => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, provider, transactions, currentBlock, dispatch, toast, t]);

  return null;
};
