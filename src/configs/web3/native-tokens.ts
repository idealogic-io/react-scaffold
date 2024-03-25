import invariant from "tiny-invariant";
import { MAINNET_CHAIN_IDS, TESTNET_CHAIN_IDS } from "./chains";
import { Currency, Ether, NativeCurrency, Token } from "./entities";
import { WRAPPED_NATIVE_CURRENCY } from "./wrapped-native-currencies";
import { isSupportedChain } from "./utils";

export function isMatic(chainId: number) {
  return chainId === MAINNET_CHAIN_IDS.POLYGON || chainId === TESTNET_CHAIN_IDS.POLYGON_MUMBAI;
}

class MaticNativeCurrency extends NativeCurrency {
  equals(other: Currency) {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped() {
    if (!isMatic(this.chainId)) {
      throw new Error("Not matic");
    }
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    invariant(wrapped instanceof Token);
    return wrapped;
  }

  public constructor(chainId: number) {
    if (!isMatic(chainId)) {
      throw new Error("Not matic");
    }
    super(chainId, 18, "MATIC", "Polygon Matic", "/images/chain_images/polygon_chain.webp", "matic-network");
  }
}

export function isBsc(chainId: number) {
  return chainId === MAINNET_CHAIN_IDS.BSC || chainId == TESTNET_CHAIN_IDS.BSC_TEST;
}

class BscNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isBsc(this.chainId)) {
      throw new Error("Not bnb");
    }
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    invariant(wrapped instanceof Token);
    return wrapped;
  }

  public constructor(chainId: number) {
    if (!isBsc(chainId)) {
      throw new Error("Not bnb");
    }
    super(chainId, 18, "BNB", "BNB", "/images/chain_images/bnb_chain.webp", "binancecoin");
  }
}

export function isAvalanche(chainId: number) {
  return chainId === MAINNET_CHAIN_IDS.AVAX || chainId === TESTNET_CHAIN_IDS.FUJI;
}

class AvaxNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isAvalanche(this.chainId)) {
      throw new Error("Not avalanche");
    }
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    invariant(wrapped instanceof Token);
    return wrapped;
  }

  public constructor(chainId: number) {
    if (!isAvalanche(chainId)) {
      throw new Error("Not avalanche");
    }
    super(chainId, 18, "AVAX", "AVAX", "/images/chain_images/avalanche_chain.webp", "avalanche-2");
  }
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (wrapped) return wrapped;
    throw new Error(`Unsupported chain ID: ${this.chainId}`);
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {};

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId));
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {};

export const nativeOnChain = (chainId: number) => {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId];
  let nativeCurrency: NativeCurrency | Token;
  if (isMatic(chainId)) {
    nativeCurrency = new MaticNativeCurrency(chainId);
  } else if (isBsc(chainId)) {
    nativeCurrency = new BscNativeCurrency(chainId);
  } else if (isAvalanche(chainId)) {
    nativeCurrency = new AvaxNativeCurrency(chainId);
  } else if (isSupportedChain(chainId)) {
    nativeCurrency = ExtendedEther.onChain(chainId);
  } else {
    nativeCurrency = ExtendedEther.onChain(MAINNET_CHAIN_IDS.MAINNET);
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency);
};
