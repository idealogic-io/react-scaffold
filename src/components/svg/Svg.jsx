import styled from "styled-components";
import { space } from "styled-system";

const Svg = styled.svg`
  align-self: center;
  fill: ${({ theme, color }) => theme.colors[color]};
  flex-shrink: 0;
  ${space}
`;

Svg.defaultProps = {
  color: "black",
  width: "20px",
  xmlns: "http://www.w3.org/2000/svg",
};

export default Svg;
