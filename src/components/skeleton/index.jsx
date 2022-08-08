import styled from "styled-components";
import { layout, space } from "styled-system";
import { variantStyles } from "./theme";

import { animation, variant as VARIANT } from "./theme";

const StyledSkelton = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ variant, theme }) => (variant === VARIANT.CIRCLE ? theme.radii.circle : theme.radii.small)};
  ${({ theme }) => theme.mediaQueries.sm} {
    min-height: 14px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: 18px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    min-height: 20px;
  }
  height: 100%;

  ${({ animation }) => variantStyles(animation)};

  ${layout}

  ${space}
`;

StyledSkelton.defaultProps = {
  variant: VARIANT.RECT,
  animation: animation.PULSE,
};

export default StyledSkelton;
