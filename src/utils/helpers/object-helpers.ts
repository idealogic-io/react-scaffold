import { Token } from "types/token";
/**
 * Sorts tokens from 'src/configs/tokens' in alphabetic order but with native token on top.
 * @param tokensObj
 */
export const sortTokensObjInAlphabeticOrder = (tokensObj: { [key: string]: Token }) => {
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
