import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import useSWR from "swr";
import useSlotChangeSolana from "./use-slot-change-solana";

const useWeb3BalanceSolana = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { data = { balance: 0, formattedBalance: 0 }, mutate } = useSWR(
    () => (publicKey ? `web3/getBalance/${publicKey.toBase58()}` : null),
    async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        const formattedBalance = balance / LAMPORTS_PER_SOL;

        return { balance, formattedBalance };
      }
    },
  );

  useSlotChangeSolana(mutate);

  return data;
};

export default useWeb3BalanceSolana;
