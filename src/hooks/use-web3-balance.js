import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "@ethersproject/bignumber";
import useSWR from "swr";

export const useWeb3Balance = () => {
  const { account, library } = useWeb3React();
  const { data: balance = BigNumber.from(0), mutate } = useSWR(
    () => (account ? `web3/getBalance/${account}` : null),
    async () => {
      const result = await library.getBalance(account);
      return result;
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
