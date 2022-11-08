import React, { useState } from "react";
import { Box, Skeleton } from "components";
import { ImageProps } from "./types";
import { StyledImage } from "./StyledImage";

const Image: React.FC<ImageProps> = ({ src, width, height, alt, variant, animation, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box {...props}>
      {isLoading && <Skeleton variant={variant} animation={animation} width={width} height={height} />}
      <StyledImage
        style={{ display: !isLoading ? "block" : "none" }}
        width={width}
        height={height}
        src={src}
        variant={variant}
        alt={alt}
        onLoad={() => setLoading(false)}
      />
    </Box>
  );
};

export default Image;
