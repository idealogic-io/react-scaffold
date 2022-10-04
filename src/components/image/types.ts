import { SkeletonProps } from "components/skeleton/types";

export type ImageDimensions = {
  width: string;
  height: string;
  variant?: SkeletonProps["variant"];
};

export interface ImageProps extends ImageDimensions {
  src: string;
  alt?: string;
  variant?: SkeletonProps["variant"];
  animation?: SkeletonProps["animation"];
}
