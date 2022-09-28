import { BigNumber } from "@ethersproject/bignumber";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import useOnBlockListener from "./use-on-block-listener";

export const useWeb3Balance = () => {
  const { account, library } = useWeb3React();

  const { data: balance = BigNumber.from(0), mutate } = useSWR(
    () => (account ? `web3/getBalance/${account}` : null),
    async () => {
      if (library && account) {
        return await library.getBalance(account);
      }
    },
  );

  useOnBlockListener(mutate);

  return { balance };
};

export default useWeb3Balance;
