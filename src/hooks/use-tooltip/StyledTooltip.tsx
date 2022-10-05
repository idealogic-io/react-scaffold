import styled from "styled-components";
import { motion } from "framer-motion";

export const Arrow = styled.div`
  &,
  &::before {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    z-index: -1;
  }

  &::before {
    content: "";
    transform: rotate(45deg);
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledTooltip = styled(motion.div)`
  padding: 16px;
  font-size: 16px;
  line-height: 130%;
  border-radius: 16px;
  max-width: calc(320px - (16px * 2));
  z-index: 101;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.tooltip};

  &[data-popper-placement^="top"] > ${Arrow} {
    bottom: -4px;
  }

  &[data-popper-placement^="bottom"] > ${Arrow} {
    top: -4px;
  }

  &[data-popper-placement^="left"] > ${Arrow} {
    right: -4px;
  }

  &[data-popper-placement^="right"] > ${Arrow} {
    left: -4px;
  }
`;
