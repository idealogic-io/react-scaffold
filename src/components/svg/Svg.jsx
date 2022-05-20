import styled, { css, keyframes } from "styled-components";
import { space } from "styled-system";

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

const Svg = styled.svg`
  align-self: center; // Safari fix
  fill: ${({ theme, color }) => theme.colors[color]};
  flex-shrink: 0;
  ${({ spin }) => spin && spinStyle}
  ${space}
`;

Svg.defaultProps = {
  color: "black",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
  spin: false,
};

export default Svg;
