import React, { useState } from "react";
// Components + styling
import { Skeleton, Box } from "components";
import { StyledImage } from "./styled";
// Utils
import { getFileNameFromSrc } from "utils";
// Types
import { ImageProps } from "./types";

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  variant,
  animation,
  skeletonHeight,
  skeletonWidth,
  ...props
}) => {
  const [isLoading, setLoading] = useState(true);
  const altDescription = getFileNameFromSrc(src);

  return (
    <Box {...props} width={width} height={height}>
      {isLoading && (
        <Skeleton
          variant={variant}
          animation={animation}
          width={skeletonWidth ?? width}
          height={skeletonHeight ?? height}
        />
      )}
      <StyledImage
        style={{ display: !isLoading ? "block" : "none" }}
        src={src}
        variant={variant}
        alt={alt || altDescription}
        onLoad={() => {
          setLoading(false);
        }}
      />
    </Box>
  );
};

export default Image;
