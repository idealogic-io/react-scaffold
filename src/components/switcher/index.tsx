import React from "react";
// Components
import Text from "components/text";
import { StyledCheckbox } from "../checkbox/styled";
import { Checkbox, Slider, StyledSwitcher } from "./styled";
// Types
import { SwitcherProps } from "./types";

export const Switcher: React.FC<SwitcherProps> = ({
  label,
  checked,
  scale,
  disabled,
  onChange,
  labelProps,
  ...props
}) => {
  return (
    <StyledCheckbox {...props} disabled={disabled}>
      <StyledSwitcher checked={checked} scale={scale}>
        <Checkbox type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
        <Slider {...{ checked, disabled, scale }} />
      </StyledSwitcher>

      {typeof label === "string" ? (
        <Text textScale="body1" mx="18px" {...labelProps}>
          {label}
        </Text>
      ) : (
        React.isValidElement(label) && label
      )}
    </StyledCheckbox>
  );
};

Switcher.defaultProps = {
  checked: false,
  disabled: false,
  scale: "md",
};
