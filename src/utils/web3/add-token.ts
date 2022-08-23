// Note: should always check for library?.provider?.isMetaMask before use
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenLogo?: string,
) => {
  if (window.ethereum && window.ethereum.request) {
    try {
      const tokenAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenLogo,
          },
        },
      });
      return tokenAdded;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    return false;
  }
};
