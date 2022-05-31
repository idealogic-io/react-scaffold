import React, { cloneElement, isValidElement } from "react";
import StyledButton from "./StyledButton";
import { scales, variants } from "./theme";

const getExternalLinkProps = () => ({
  target: "_blank",
  rel: "noreferrer noopener",
});

const Button = props => {
  const { startIcon, endIcon, children, isLoading, disabled, external } = props;
  const isDisabled = isLoading || disabled;
  const internalProps = external ? getExternalLinkProps() : {};

  return (
    <StyledButton disabled={isDisabled} $isLoading={isLoading} {...internalProps} {...props}>
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            mr: "0.5rem",
          })}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            ml: "0.5rem",
          })}
      </>
    </StyledButton>
  );
};

Button.defaultProps = {
  isLoading: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
};

export default Button;
