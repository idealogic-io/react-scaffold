import { useState } from "react";
import { toast } from "react-toastify";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { RpcResponseAndContext, SignatureResult, Transaction } from "@solana/web3.js";

import { useTranslation } from "context";
import { ToastDescriptionWithTxSolana } from "components";
import { toastOptions } from "configs";

const useWaitTransactionSolana = () => {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const fetchWithCatchTxErrorSolana = async (
    transaction: Transaction,
  ): Promise<(RpcResponseAndContext<SignatureResult> & { signature: string }) | null> => {
    try {
      setLoading(true);

      const signature = await sendTransaction(transaction, connection);

      console.log(signature, "signature");

      toast.success(
        <ToastDescriptionWithTxSolana txHash={signature}>{t("Transaction submitted")}</ToastDescriptionWithTxSolana>,
        toastOptions,
      );

      const {
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const confirmed = await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

      console.log(confirmed, "confirmed");

      return { ...confirmed, signature };
    } catch (error) {
      // Error messages fire at SolanaContext onError method
      console.error("Error in fetchWithCatchTxErrorSolana: ", error);
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    fetchWithCatchTxErrorSolana,
    loading,
  };
};

export default useWaitTransactionSolana;
