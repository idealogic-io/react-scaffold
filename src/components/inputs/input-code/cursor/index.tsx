import React, { useEffect, useState } from "react";

import { Text } from "components";

import { CursorProps } from "../types";

export const DEFAULT_BLINKING_SPEED = 300;
export const DEFAULT_CURSOR_SYMBOL = "|";

export const Cursor: React.FC<CursorProps> = ({ cursorSymbol, delay, isLastNFocus, value }) => {
  const [visibleFlag, setFlag] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlag(flag => !flag);
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);

  if (isLastNFocus && !!value) {
    return (
      <Text textScale="body1" width="14px">
        {visibleFlag ? `${value}${cursorSymbol}` : value}
      </Text>
    );
  }

  return <Text textScale="body1">{visibleFlag ? cursorSymbol : ""}</Text>;
};

Cursor.defaultProps = {
  cursorSymbol: DEFAULT_CURSOR_SYMBOL,
  delay: DEFAULT_BLINKING_SPEED,
};
