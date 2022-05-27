import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";

import { getFontStyles, getTextColor } from "components/text";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export const scales = {
  XL: "xl",
  MD: "md",
  SM: "sm",
};

export const scaleVariants = {
  [scales.XL]: {
    height: "54px",
    width: "200px",
    padding: "0 24px",
  },
  [scales.MD]: {
    height: "48px",
    width: "150px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    width: "100px",
    padding: "0 16px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
};

const getDisabledStyles = ({ $isLoading, theme }) => {
  if ($isLoading) {
    return `
      &:disabled {
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
    }
  `;
};

const ButtonStyled = styled.button`
  position: relative;
  align-items: center;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.medium};
  box-shadow: ${({ theme }) => theme.shadows.button};
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  outline: 0;
  font-size: 16px;
  font-weight: 600;
  ${getFontStyles};
  ${getTextColor};
  ${getDisabledStyles};
  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${space}
  ${typography}
  ${layout}
  ${opacity}
  ${border}
  ${shadow}
  transition: all .2s ease-in-out;
  &:hover {
    transform: ${({ disabled }) => !disabled && `scale(0.95)`};
  }
  &:active {
    transform: ${({ disabled }) => !disabled && `scale(0.9)`};
  }
`;

export default ButtonStyled;
