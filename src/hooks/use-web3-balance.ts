import { useEffect } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import useSWR from "swr";

import useActiveWeb3 from "./use-active-web";

export const useWeb3Balance = () => {
  const { account, library } = useActiveWeb3();

  const { data: balance = BigNumber.from(0), mutate } = useSWR(
    () => (account ? `web3/getBalance/${account}` : null),
    async () => {
      if (library && account) {
        return await library.getBalance(account);
      }
    },
  );

  useEffect(() => {
    if (library) {
      library.on("block", () => {
        mutate();
      });

      return () => {
        library.removeAllListeners("block");
      };
    }
  }, [library]);

  return { balance };
};

export default useWeb3Balance;
