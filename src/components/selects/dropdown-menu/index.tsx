import React from "react";

import { DropdownMenuItem, DropdownMenuWrapper } from "./styled";
import { Checkbox, Text } from "components";

import { DropdownMenuProps } from "../types";

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onClick,
  value,
  options,
  isMultiple,
  values,
  ...props
}) => {
  return (
    <DropdownMenuWrapper {...props}>
      {options.map((option, index) => {
        const { title } = option;

        return (
          <DropdownMenuItem
            key={index}
            disabled={value === option}
            onClick={() => {
              onClick(option);
            }}
          >
            <Text textScale="body2" ellipsis>
              {title}
            </Text>

            {isMultiple && values && <Checkbox ml="2px" checked={values.includes(option)} />}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuWrapper>
  );
};
