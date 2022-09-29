import { useEffect, useState } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { TokenType } from "./use-token-data";
import { Account } from "@solana/spl-token";

const defaultValue = { isLoading: false, txFee: 0 };

type UseEstimateTxFeeArgs = {
  address: string;
  token: TokenType;
  valueToSend: string;
  associatedAddress: Account | null;
  createTxToSend: (value: string) => Promise<Transaction | undefined>;
  createTxForAssociatedTokenAccount: () => Promise<Transaction | undefined>;
};

const useEstimateTxFee = ({
  address,
  valueToSend,
  associatedAddress,
  token,
  createTxToSend,
  createTxForAssociatedTokenAccount,
}: UseEstimateTxFeeArgs) => {
  const [estimate, setEstimate] = useState(defaultValue);

  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (address && valueToSend) {
      setEstimate(prev => ({ ...prev, isLoading: true }));
      const time = 1000;

      const timeout = setTimeout(estimateTxFee, time);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setEstimate(defaultValue);
    }
  }, [valueToSend, address, publicKey]);

  const estimateTxFee = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      let tx;
      if (associatedAddress || token.isNative) {
        tx = await createTxToSend(valueToSend);
      } else {
        tx = await createTxForAssociatedTokenAccount();
      }

      if (tx) {
        const feeInLamports = await tx.getEstimatedFee(connection);

        const txFee = feeInLamports / LAMPORTS_PER_SOL;
        setEstimate({ txFee, isLoading: false });
      } else {
        setEstimate({ txFee: 0, isLoading: false });
      }
    } catch (error) {
      setEstimate({ txFee: 0, isLoading: false });
    }
  };

  return { estimate, estimateTxFee };
};

export default useEstimateTxFee;
