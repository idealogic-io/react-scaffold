import { BoxProps } from "components/layout/components/types";
import { SkeletonProps } from "components/skeleton/types";

export interface ImageProps extends BoxProps {
  src: string;
  width: string;
  height: string;
  alt?: string;
  variant?: SkeletonProps["variant"];
  animation?: SkeletonProps["animation"];
}
