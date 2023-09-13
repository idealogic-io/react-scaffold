import { SkeletonProps } from "components/skeleton/types";

export type ImageDimensions = {
  width: string;
  height: string;
  skeletonHeight?: string;
  skeletonWidth?: string;
  isHideSkeleton?: boolean;
  isWrapperAbsolute?: boolean;
  variant?: SkeletonProps["variant"];
  setExternalLoading?: (isExternalLoading: boolean) => void;
};

export interface ImageProps extends ImageDimensions {
  src: string;
  alt?: string;
  variant?: SkeletonProps["variant"];
  animation?: SkeletonProps["animation"];
}
