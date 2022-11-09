import React from "react";

import StyledButton from "./StyledButton";
import { accentColor, ButtonProps, scales, variants } from "./types";

import { SpinnerIcon } from "components/svg";

export const getExternalLinkProps = () => ({
  target: "_blank",
  rel: "noreferrer noopener",
});

const Button = <E extends React.ElementType = "button">(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, children, isLoading, disabled, external, ...rest } = props;
  const isDisabled = isLoading || disabled;
  const internalProps = external ? getExternalLinkProps() : {};

  return (
    <StyledButton {...internalProps} {...rest} disabled={isDisabled}>
      {isLoading ? (
        <SpinnerIcon />
      ) : (
        <>
          {React.isValidElement(startIcon) &&
            React.cloneElement(startIcon, {
              mr: "0.5rem",
            })}

          {children}

          {React.isValidElement(endIcon) &&
            React.cloneElement(endIcon, {
              ml: "0.5rem",
            })}
        </>
      )}
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
  accentColor: accentColor.accent,
  hsl: "500",
};

export default Button;
