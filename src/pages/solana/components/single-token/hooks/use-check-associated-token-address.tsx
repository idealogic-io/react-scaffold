import {
  Account,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { toast } from "react-toastify";
import useSWR from "swr";

import { ToastDescriptionWithTxSolana } from "components";

import { toastOptions } from "configs";
import { useTranslation } from "context";

import useTokenData from "./use-token-data";
import { useSlotChangeSolana, useWaitTransactionSolana } from "hooks";

const useCheckAssociatedTokenAddress = ({ address }: { address: string }) => {
  const { data: associatedAddress = null, mutate } = useSWR<Account | void>(
    () => `checkAssociatedTokenAddress/${address}`,
    async () => {
      if (publicKey) {
        return await checkAssociatedTokenAddress();
      }
    },
  );

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { fetchWithCatchTxErrorSolana, loading: pendingTx } = useWaitTransactionSolana();
  const { t } = useTranslation();
  const { toPubkey } = useTokenData({
    address,
  });

  const tokenPublicKey = new PublicKey(address);

  useSlotChangeSolana(mutate);

  const checkAssociatedTokenAddress = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      const associatedToken = await getAssociatedTokenAddress(tokenPublicKey, toPubkey);
      const account = await getAccount(connection, associatedToken);

      mutate(account, { revalidate: false });
    } catch (error) {
      console.error("Error in checkCorrespondingTokenAddress: ", error);
    }
  };

  const createTxForAssociatedTokenAccount = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      const associatedToken = await getAssociatedTokenAddress(tokenPublicKey, toPubkey);

      const transaction = new Transaction().add(
        createAssociatedTokenAccountInstruction(publicKey, associatedToken, toPubkey, tokenPublicKey),
      );

      const { blockhash } = await connection.getLatestBlockhash();

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      return transaction;
    } catch (error) {
      console.error("Error in createTxForAssociatedTokenAccount: ", error);
    }
  };

  const createAssociatedTokenAccount = async () => {
    const tx = await createTxForAssociatedTokenAccount();

    if (tx) {
      const confirmed = await fetchWithCatchTxErrorSolana(tx);

      if (confirmed?.signature) {
        toast.success(
          <ToastDescriptionWithTxSolana txHash={confirmed.signature}>
            {t("Associated token account was created")}
          </ToastDescriptionWithTxSolana>,
          toastOptions,
        );

        checkAssociatedTokenAddress();
      }
    } else {
      toast.error(t("Couldn't create associated token address"));
    }
  };

  return {
    associatedAddress,
    loading: pendingTx,
    checkAssociatedTokenAddress,
    createTxForAssociatedTokenAccount,
    createAssociatedTokenAccount,
  };
};

export default useCheckAssociatedTokenAddress;
