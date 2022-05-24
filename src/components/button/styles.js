import styled from "styled-components";
import { space, typography, layout, opacity, border, shadow, variant } from "styled-system";

import { getFontStyles, getTextColor } from "components/text";

export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export const scales = {
  MD: "md",
  SM: "sm",
};

export const scaleVariants = {
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
    transform: scale(0.95);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export default ButtonStyled;
