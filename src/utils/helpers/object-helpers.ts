import { Token } from "@pancakeswap/sdk";

export const sortObjectsKeysInAlphabeticOrder = (tokensObj: { [key: string]: Token }) => {
  const [nativeTokenKey] = Object.entries(tokensObj)[0];

  const sortedKeys = Object.keys(tokensObj)
    // First key is native token so we should take others for sorting
    .slice(1)
    .sort((a, b) => a.localeCompare(b));
  const sortedObj: { [key: string]: Token } = {};

  [nativeTokenKey, ...sortedKeys].forEach(key => {
    sortedObj[key] = tokensObj[key];
  });

  return sortedObj;
};
