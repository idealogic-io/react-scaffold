import { TokenList } from "../types";

export const fetchAllTokens = async () => {
  try {
    const response = await fetch("/tokens.json");

    const data = (await response.json()) as TokenList;
    return data;
  } catch (e) {
    console.error("Failed to fetch tokens", e);
    return { name: "", version: "", tokens: [] };
  }
};
