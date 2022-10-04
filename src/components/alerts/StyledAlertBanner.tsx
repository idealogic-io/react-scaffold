import styled from "styled-components";

import { Box } from "components";
import { getThemeColor } from "./theme";
import { Variants } from "./types";

export const StyledAlertBanner = styled(Box)<{ variant?: Variants }>`
  background-color: ${getThemeColor}10;
  border: 1px solid ${getThemeColor};
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 16px;
  display: flex;
`;

export const StylesCloseIcon = styled(Box)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;
