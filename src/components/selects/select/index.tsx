import React from "react";

import { DropdownSelectWrapper } from "./styled";
import { Flex, Text } from "components";
import { ArrowDownIcon } from "components/svg";

import { useTranslation } from "react-i18next";

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
      <Flex width="100%" justifyContent="space-between">
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

        <Flex>
          <Icon width="12px" {...iconProps} />
        </Flex>
      </Flex>

      {tooltip}
    </DropdownSelectWrapper>
  );
};
