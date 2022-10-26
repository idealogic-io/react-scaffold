import { chainIdMainnet, chainIdTestnet } from "configs";
import { Currency } from "./currency";

type KeysTest = keyof typeof chainIdTestnet;
type ValuesTest = typeof chainIdTestnet[KeysTest];

type KeysMain = keyof typeof chainIdMainnet;
type ValuesMain = typeof chainIdMainnet[KeysMain];

export type ChainId = ValuesTest | ValuesMain;

export class Token extends Currency {
  constructor(
    public chainId: ChainId | number,
    public address: string,
    public decimals: number,
    public symbol?: string,
    public name?: string,
    public projectLink?: string,
  ) {
    super(decimals, symbol, name);
  }
  // /**
  //  * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
  //  * @param other other token to compare
  //  */
  // equals(other: Token): boolean;
  // /**
  //  * Returns true if the address of this token sorts before the address of the other token
  //  * @param other other token to compare
  //  * @throws if the tokens have the same address
  //  * @throws if the tokens are on different chains
  //  */
  // sortsBefore(other: Token): boolean;
}
