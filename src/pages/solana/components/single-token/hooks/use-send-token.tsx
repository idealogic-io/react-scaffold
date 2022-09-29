import { createTransferInstruction, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { toast } from "react-toastify";

import { ToastDescriptionWithTxSolana } from "components";

import { toastOptions } from "configs";
import { useTranslation } from "context";
// import { getOrCreateAssociatedTokenAccount } from "utils/web3";

import { useWaitTransactionSolana } from "hooks";
import { TokenType } from "./use-token-data";

type UseSendTokenArgs = {
  address: string;
  toPubkey: PublicKey;
  token: TokenType;
};

const useSendToken = ({ address, toPubkey, token }: UseSendTokenArgs) => {
  const { connection } = useConnection();
  const { publicKey: fromPubkey } = useWallet();
  const { fetchWithCatchTxErrorSolana, loading: pendingTx } = useWaitTransactionSolana();
  const { t } = useTranslation();

  const createCustomTransferTx = async (valueToSend: string) => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      const transaction = new Transaction();
      const tokenPublicKey = new PublicKey(address);
      // Those functions should be called if you do not create a corresponding token address
      // before call send tx. I our case we check and create address before send tokens
      // const fromTokenAccount = await createCorrespondingAddress(fromPubkey, tokenPublicKey, fromPubkey);
      // const toTokenAccount = await createCorrespondingAddress(fromPubkey, tokenPublicKey, toPubkey);

      const associatedTokenFrom = await getAssociatedTokenAddress(tokenPublicKey, fromPubkey);
      const fromTokenAccount = await getAccount(connection, associatedTokenFrom);

      const associatedTokenTo = await getAssociatedTokenAddress(tokenPublicKey, toPubkey);
      const toTokenAccount = await getAccount(connection, associatedTokenTo);

      if (fromTokenAccount && toTokenAccount) {
        const instruction = createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          fromPubkey,
          +valueToSend * Math.pow(10, token.decimals),
          [],
          TOKEN_PROGRAM_ID,
        );

        transaction.add(instruction);

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.feePayer = fromPubkey;
        transaction.recentBlockhash = blockhash;

        return transaction;
      }
    } catch (error) {
      console.error("Error in createCustomTransferTx: ", error);
    }
  };

  const createNativeTransferTx = async (valueToSend: string) => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      const transaction = new Transaction();
      const lamports = LAMPORTS_PER_SOL * +valueToSend;

      transaction.add(
        SystemProgram.transfer({
          fromPubkey,
          toPubkey,
          lamports,
        }),
      );
      const { blockhash } = await connection.getLatestBlockhash("finalized");

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPubkey;

      return transaction;
    } catch (error) {
      console.error("Error in createNativeTransferTx: ", error);
    }
  };

  // const createCorrespondingAddress = async (payer: PublicKey, tokenPublicKey: PublicKey, owner: PublicKey) => {
  //   // getOrCreateAssociatedTokenAccount is overwritten with almost the same logic
  //   // because native method from @solana/spl-token always returns error

  //   // Before transferring token we should check if this token exists at the receiver's wallet
  //   // If exists then AssociatedTokenAccount will be returned
  //   // In other way we should manually create AssociatedTokenAccount at the receiver's wallet
  //   // And only after that tx will be triggered
  //   try {
  //     return await getOrCreateAssociatedTokenAccount(
  //       connection,
  //       payer,
  //       tokenPublicKey,
  //       owner,
  //       fetchWithCatchTxErrorSolana,
  //       t,
  //     );
  //   } catch (error) {
  //     console.error("Error in createCorrespondingAddress: ", error);
  //   }
  // };

  const createTxToSend = async (valueToSend: string) => {
    if (token.isNative) {
      return await createNativeTransferTx(valueToSend);
    } else {
      return await createCustomTransferTx(valueToSend);
    }
  };

  const sendToken = async (valueToSend: string) => {
    const tx = await createTxToSend(valueToSend);

    if (tx) {
      const confirmed = await fetchWithCatchTxErrorSolana(tx);

      if (confirmed?.signature) {
        toast.success(
          <ToastDescriptionWithTxSolana txHash={confirmed.signature}>{t("Token sent")}</ToastDescriptionWithTxSolana>,
          toastOptions,
        );
      }
    } else {
      toast.error(t("Couldn't send token"));
    }
  };

  return { pendingTx, sendToken, createNativeTransferTx, createTxToSend };
};

export default useSendToken;
