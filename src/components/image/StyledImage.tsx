import styled from "styled-components";
import { ImageDimensions } from "./types";

export const StyledImage = styled.img<ImageDimensions>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ theme, variant }) => (variant === "circle" ? theme.radii.circle : "0px")};
`;
