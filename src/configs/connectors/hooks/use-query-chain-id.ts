import { useSearchParams } from "react-router-dom";

import { parseChainIdFromString } from "utils/web3";
import { SEARCH_PARAMS } from "navigation/routes";
import { ChainId, MAINNET_CHAIN_IDS } from "configs/connectors";

export const useQueryChainId = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const chainIdQuery = searchParams.get(SEARCH_PARAMS.chainId);
  const parsedChainId = parseChainIdFromString(chainIdQuery);

  const setQueryChainId = (chainId: ChainId) => {
    setSearchParams({ [SEARCH_PARAMS.chainId]: chainId.toString() });
  };

  const setDefaultQueryChainId = () => {
    setSearchParams({ [SEARCH_PARAMS.chainId]: MAINNET_CHAIN_IDS.MAINNET.toString() });
  };

  return { parsedChainId, setQueryChainId, setDefaultQueryChainId };
};
