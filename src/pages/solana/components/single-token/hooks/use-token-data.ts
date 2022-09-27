import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { TokenListProvider } from "@solana/spl-token-registry";
import useSWR from "swr";

import { solanaNetwork } from "App";
import { isNullableAddressSolana } from "utils/web3";
import { useSlotChangeSolana } from "hooks";

const defaultTokenData = { name: "", symbol: "", balance: "", decimals: 6, isLoading: true };
const NATIVE_CURRENCY = { name: "Solana", symbol: "SOL", decimals: 6 };

const useTokenData = ({ address }: { address: string }) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const { data = defaultTokenData, mutate } = useSWR<typeof defaultTokenData | void>(
    () => `useTokenData/${address}`,
    async () => {
      if (publicKey) {
        return await getTokenData();
      }
    },
  );

  const toAddress = "HsyCpTgfeBm25wnzxqTn4wzfgviP3WPwc7ofrDtA2qA4";
  const toPubkey = new PublicKey(toAddress);
  const isNativeToken = isNullableAddressSolana(address);
  const valueToSend = 0.01;

  useSlotChangeSolana(mutate);

  const getTokenData = async () => {
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      if (isNativeToken) {
        const data = await getNativeTokenData(publicKey);

        mutate({ ...data, isLoading: false }, { revalidate: false });
      } else {
        const data = await getCustomTokenData(publicKey);

        mutate({ ...data, isLoading: false }, { revalidate: false });
      }
    } catch (error) {
      console.error("Error in getTokenData: ", error, address);
    }
  };

  const getNativeTokenData = async (pubKey: PublicKey) => {
    try {
      const balance = await connection.getBalance(pubKey);
      const balanceUI = balance / LAMPORTS_PER_SOL;

      return { ...NATIVE_CURRENCY, balance: balanceUI.toString() };
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

        return {
          name,
          symbol,
          decimals,
          balance: data.value[0]?.account?.data?.parsed?.info?.tokenAmount?.uiAmountString ?? "0",
        };
      });
    } catch (error) {
      console.error("Error in getCustomTokenData: ", error, address);

      return defaultTokenData;
    }
  };

  return {
    data: { ...data, isNativeToken },
    toPubkey,
    valueToSend,
    isNativeToken,
    getTokenData,
  };
};

export default useTokenData;
