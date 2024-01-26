import { useState } from "react";
import BigNumber from "bignumber.js";

export const useInputHandlerWithMax = (
  balanceInput: bigint | undefined | null,
  allowanceInput: bigint | undefined | null,
  decimalsInput: bigint | number | undefined | null,
) => {
  const [value, setValue] = useState("0");
  const [inputValue, setInputValue] = useState("");
  const [shouldApprove, setShouldApprove] = useState(false);

  const decimals = decimalsInput ? Number(decimalsInput) : 18;
  const regex = new RegExp(`^[0-9]*[.,]?[0-9]{0,${decimals}}$`);

  const convertToBN = (value: BigNumber | bigint | string) => new BigNumber(value.toString());

  const balance = convertToBN(balanceInput ?? "0");
  const allowance = allowanceInput ? convertToBN(allowanceInput) : null;

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value.replace(/,/g, ".");

    if (regex.test(valueFromInput)) {
      if (valueFromInput.startsWith(".")) {
        setInputValue("0" + valueFromInput);
        balanceCheck(convertToBN("0" + valueFromInput).decimalExponentFormat(decimals, true));
      } else if (valueFromInput === "" || valueFromInput === " ") {
        setInputValue("");
        balanceCheck(convertToBN("0"));
      } else {
        setInputValue(valueFromInput);
        balanceCheck(convertToBN(valueFromInput).decimalExponentFormat(decimals, true));
      }
    }
  };

  const maxHandler = () => {
    setInputValue(balance.decimalExponentFormat(decimals, false).toFormatExtended(decimals));
    setValue(balance.toString());
  };

  const allowanceCheck = (value: BigNumber) => {
    if (allowance) {
      setShouldApprove(value.isGreaterThan(allowance));
    } else {
      setShouldApprove(false);
    }
  };

  const balanceCheck = (value: BigNumber) => {
    allowanceCheck(value);
    if (value.isGreaterThan(balance)) {
      maxHandler();
    } else {
      setValue(value.toString());
    }
  };

  const reset = () => {
    setValue("0");
    setInputValue("");
    setShouldApprove(false);
  };

  return { onInputChange, value, inputValue, shouldApprove, maxHandler, reset };
};

// Example usage with <input/>
//
// <input
// inputMode="decimal"
// pattern="^(?!\.)[0-9]*[.,]?[0-9]*$"
// value={inputValue}
// onChange={onInputChange}
// />
//
// contractWriteFunc({args: [value]})
