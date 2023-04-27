import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { parseChainIdFromString } from "utils/web3";
import { SEARCH_PARAMS } from "navigation/routes";
import { getChainIds } from "configs";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID as string;

export const useHandleSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const networkId = searchParams.get(SEARCH_PARAMS.chainId);
  const _networkId = parseChainIdFromString(networkId);
  const supportedChainIds = getChainIds();

  useEffect(() => {
    if (!_networkId) {
      setSearchParams({ [SEARCH_PARAMS.chainId]: CHAIN_ID });
    }
    if (_networkId && !supportedChainIds.includes(_networkId)) {
      setSearchParams({ [SEARCH_PARAMS.chainId]: CHAIN_ID });
    }
  }, [_networkId]);

  return { chainIdFromSearchParams: _networkId, setSearchParams };
};
