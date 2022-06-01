import { hexlify } from "@ethersproject/bytes";
import { toUtf8Bytes } from "@ethersproject/strings";

export const utf8ToHex = (string: string) => {
  return hexlify(toUtf8Bytes(string));
};
