import React from "react";

import { DropdownSelectWrapper } from "./styled";
import { RowBetween, Text } from "components";
import { ArrowDownIcon } from "components/svg";

import { useTranslation } from "context";

import { SelectProps } from "../types";

export const Select: React.FC<SelectProps> = ({
  targetRef,
  wrapperProps,
  title,
  titleProps,
  placeholder = "Please select...",
  placeholderProps,
  Icon = ArrowDownIcon,
  iconProps,
  tooltip,
}) => {
  const { t } = useTranslation();

  return (
    <DropdownSelectWrapper ref={targetRef} {...wrapperProps}>
      <RowBetween>
        {!title ? (
          <Text textScale="body2" {...placeholderProps} ellipsis>
            {t(placeholder)}
          </Text>
        ) : typeof title === "string" ? (
          <Text textScale="body2" {...titleProps} ellipsis>
            {t(title)}
          </Text>
        ) : (
          React.isValidElement(title) && title
        )}

        <Icon width="12px" {...iconProps} />
      </RowBetween>

      {tooltip}
    </DropdownSelectWrapper>
  );
};
