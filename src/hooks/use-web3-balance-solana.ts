import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import useSWR from "swr";
import useSlotChangeSolana from "./use-slot-change-solana";

const useWeb3BalanceSolana = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { data: balance = 0, mutate } = useSWR(
    () => (publicKey ? `web3/getBalance/${publicKey.toBase58()}` : null),
    async () => {
      if (publicKey) {
        return await connection.getBalance(publicKey);
      }
    },
  );

  useSlotChangeSolana(mutate);

  return { balance };
};

export default useWeb3BalanceSolana;
