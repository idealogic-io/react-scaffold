import styled, { css, keyframes } from "styled-components";
import { space } from "styled-system";
import { SvgProps } from "./types";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinStyle = css`
  animation: ${rotate} 2s linear infinite;
`;

const Svg = styled.svg<SvgProps>`
  align-self: center;
  fill: ${({ theme, color }) => color && theme.colors[color]};
  flex-shrink: 0;
  transition: all 0.3s ease;
  ${({ spin }) => spin && spinStyle}

  ${space}
`;

Svg.defaultProps = {
  spin: false,
  color: "monochrome900",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
};

export default Svg;
