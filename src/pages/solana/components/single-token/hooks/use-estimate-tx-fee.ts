import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useSWR from "swr";

import { useCheckAssociatedTokenAddress, useSendToken, useTokenData } from ".";
import { useSlotChangeSolana } from "hooks";

const useEstimateTxFee = ({ address }: { address: string }) => {
  const { data: txFee = 0, mutate } = useSWR<number | void>(
    () => `estimateTxFee/${address}`,
    async () => {
      if (publicKey) {
        return await estimateTxFee();
      }
    },
  );

  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { createTxToSend } = useSendToken({ address });
  const { associatedAddress, createTxForAssociatedTokenAccount } = useCheckAssociatedTokenAddress({ address });
  const { data } = useTokenData({ address });

  useSlotChangeSolana(mutate);

  const estimateTxFee = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      let tx;
      if (associatedAddress || data.isNativeToken) {
        tx = await createTxToSend();
      } else {
        tx = await createTxForAssociatedTokenAccount();
      }

      if (tx) {
        const feeInLamports = await tx.getEstimatedFee(connection);

        const fee = feeInLamports / LAMPORTS_PER_SOL;
        mutate(fee, { revalidate: false });
      } else {
        mutate(0, { revalidate: false });
      }
    } catch (error) {
      mutate(0, { revalidate: false });
    }
  };

  return { txFee, estimateTxFee };
};

export default useEstimateTxFee;
