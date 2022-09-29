import { BigNumber } from "@ethersproject/bignumber";
import useSWR from "swr";
import { useWeb3React } from "@web3-react/core";
import { formatUnits } from "@ethersproject/units";
import useOnBlockListener from "./use-on-block-listener";
import { nativeCurrencies } from "configs";

export const useWeb3Balance = () => {
  const { account, library, chainId } = useWeb3React();

  const { data = { balance: BigNumber.from(0), formattedBalance: "0" }, mutate } = useSWR(
    () => (account ? `web3/getBalance/${account}` : null),
    async () => {
      if (library && account && chainId) {
        const balance = await library.getBalance(account);
        const formattedBalance = formatUnits(balance, nativeCurrencies[chainId]?.decimals);

        return { balance, formattedBalance };
      }
    },
  );

  useOnBlockListener(mutate);

  return data;
};

export default useWeb3Balance;
