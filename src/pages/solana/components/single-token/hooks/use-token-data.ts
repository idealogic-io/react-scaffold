import { useEffect, useState } from "react";
import { createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { TokenListProvider } from "@solana/spl-token-registry";

import { solanaNetwork } from "App";
import { getOrCreateAssociatedTokenAccount, isNullableAddressSolana } from "utils/web3";
import { useWaitTransactionSolana } from "hooks";
import { useTranslation } from "context";

type useTokenDataArgs = { address: string };

const defaultTokenData = { name: "", symbol: "", balance: "", decimals: 6, txFee: 0 };

const useTokenData = ({ address }: useTokenDataArgs) => {
  const [tokenData, setTokenData] = useState(defaultTokenData);

  const { connection } = useConnection();
  const { publicKey: fromPubkey } = useWallet();
  const { fetchWithCatchTxErrorSolana } = useWaitTransactionSolana();
  const { t } = useTranslation();

  const toAddress = "7ZTxiKhApiPZf1TWLER6jbmk6QkeVkVWZ8tBKMHX8tTs";
  const toPubkey = new PublicKey(toAddress);
  const isNativeToken = isNullableAddressSolana(address);
  const valueToSend = 0.01;

  useEffect(() => {
    if (fromPubkey) {
      getTokenData();
    }
  }, [fromPubkey]);

  const getTokenData = async () => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      if (isNativeToken) {
        const { balance, txFee } = await getNativeTokenData(fromPubkey);

        setTokenData({ name: "Solana", symbol: "SOL", decimals: 6, balance, txFee });
      } else {
        const { name, symbol, decimals, balance, txFee } = await getCustomTokenData(fromPubkey);

        setTokenData({
          name,
          symbol,
          decimals,
          balance,
          txFee,
        });
      }
    } catch (error) {
      setTokenData(defaultTokenData);
      console.error("Error in getTokenData: ", error, address);
    }
  };

  const getNativeTokenData = async (pubKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(pubKey);
      const balanceUI = balance / LAMPORTS_PER_SOL;
      const txFee = await calculateTxFee();

      return { balance: balanceUI.toString(), txFee };
    } catch (error) {
      console.error("Error in getNativeTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const getCustomTokenData = async (pubKey: PublicKey) => {
    try {
      const tokenPublicKey = new PublicKey(address);

      const data = await connection.getParsedTokenAccountsByOwner(pubKey, { mint: tokenPublicKey });

      return new TokenListProvider().resolve().then(async tokens => {
        const tokenList = tokens.filterByClusterSlug(solanaNetwork.toString()).getList();
        const { name, symbol, decimals } =
          tokenList.find(({ address: tokenAddress }) => tokenAddress === address) ?? defaultTokenData;
        // We can't calculate tx fee for custom token because at first it requires to create a corresponding
        // token at recipient's wallet and this action triggers the wallet to confirm action.

        // const txFee = await calculateTxFee();

        return {
          name,
          symbol,
          decimals,
          balance: data.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmountString ?? "0",
          txFee: 0,
        };
      });
    } catch (error) {
      console.error("Error in getCustomTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  const calculateTxFee = async () => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      let transaction;
      if (isNativeToken) {
        transaction = await createNativeTransferTx();
      } else {
        transaction = await createCustomTransferTx();
      }

      if (transaction) {
        const feeForMessage = await connection.getFeeForMessage(transaction.compileMessage(), "confirmed");
        const feeInLamports = feeForMessage.value;
        const fee = feeInLamports / LAMPORTS_PER_SOL;

        return fee;
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  const createNativeTransferTx = async () => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      const transaction = new Transaction();
      const lamports = LAMPORTS_PER_SOL * valueToSend;

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

  const createCustomTransferTx = async () => {
    try {
      if (!fromPubkey) throw new WalletNotConnectedError();

      const transaction = new Transaction();
      const tokenPublicKey = new PublicKey(address);

      const fromTokenAccount = await createCorrespondingAddress(fromPubkey, tokenPublicKey, fromPubkey);

      const toTokenAccount = await createCorrespondingAddress(fromPubkey, tokenPublicKey, toPubkey);

      if (fromTokenAccount && toTokenAccount) {
        const instruction = createTransferInstruction(
          fromTokenAccount.address,
          toTokenAccount.address,
          fromPubkey,
          valueToSend * Math.pow(10, tokenData.decimals),
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

  const createCorrespondingAddress = async (payer: PublicKey, tokenPublicKey: PublicKey, owner: PublicKey) => {
    // getOrCreateAssociatedTokenAccount is overwritten with almost the same logic
    // because native method from @solana/spl-token always returns error

    // Before transferring token we should check if this token exists at the receiver's wallet
    // If exists then AssociatedTokenAccount will be returned
    // In other way we should manually create AssociatedTokenAccount at the receiver's wallet
    // And only after that tx will be triggered
    try {
      return await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenPublicKey,
        owner,
        fetchWithCatchTxErrorSolana,
        t,
      );
    } catch (error) {
      console.error("Error in createCorrespondingAddress: ", error);
    }
  };

  return { tokenData, valueToSend, isNativeToken, getTokenData, createNativeTransferTx, createCustomTransferTx };
};

export default useTokenData;
