import { SkeletonProps } from "components/skeleton/types";
import styled from "styled-components";

export const StyledImage = styled.img<{ variant?: SkeletonProps["variant"] }>`
  border-radius: ${({ theme, variant }) => (variant === "circle" ? theme.radii.circle : "0px")};
`;
