import React from "react";

import { FlexGap } from "components";
import { LanguageItem } from "../";

import { LanguageMenuProps } from "./types";

const LanguageMenu: React.FC<LanguageMenuProps> = ({ onClick, options }) => {
  return (
    <FlexGap gap="16px" flexDirection="column">
      {options.map((option, key) => {
        return <LanguageItem option={option} onClick={onClick} key={key} />;
      })}
    </FlexGap>
  );
};

export default LanguageMenu;
