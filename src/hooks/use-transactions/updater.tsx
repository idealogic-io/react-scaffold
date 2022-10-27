import { useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { toast } from "react-toastify";

import { useTranslation } from "context";
import { checkedTransaction, finalizeTransaction } from "store/reducers/transactions/actions";
import { useAppDispatch, useAppSelector } from "store/store";

import { ToastDescriptionWithTx } from "components";
import { shouldCheck } from "./helpers";
import { useCurrentBlock } from "hooks";

export const useTransactionsUpdater = () => {
  const { library, chainId } = useWeb3React();
  const { t } = useTranslation();

  const currentBlock = useCurrentBlock();
  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s.transactions);

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state]);

  useEffect(() => {
    if (!chainId || !library || !currentBlock) return;

    Object.keys(transactions)
      .filter(hash => shouldCheck(currentBlock, transactions[hash]))
      .forEach(hash => {
        (library as Web3Provider)
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
              toastFunc(
                <ToastDescriptionWithTx txHash={receipt.transactionHash}>
                  {t("Transaction receipt")}
                </ToastDescriptionWithTx>,
              );
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: currentBlock }));
            }
          })
          .catch(error => {
            console.error(`failed to check transaction hash: ${hash}`, error);
          });
      });
  }, [chainId, library, transactions, currentBlock, dispatch, toast, t]);

  return null;
};
