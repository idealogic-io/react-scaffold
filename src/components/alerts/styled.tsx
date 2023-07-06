import styled from "styled-components";
import { motion } from "framer-motion";

import { getBorderColor, getThemeColor } from "./theme";
import { Variants } from "./types";

export const StyledAlertBanner = styled(motion.div)<{ variant?: Variants }>`
  background-color: ${getThemeColor};
  border: 1px solid ${getBorderColor};
  border-radius: ${({ theme }) => theme.radii.small};
  padding: 16px;
  display: flex;
`;
