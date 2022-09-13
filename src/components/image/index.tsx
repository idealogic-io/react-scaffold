import React, { useState } from "react";
import { Box, Skeleton } from "components";
import { ImageProps } from "./types";

const Image: React.FC<ImageProps> = ({ src, width, height, alt, variant, animation, ...props }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Box {...props}>
      {isLoading && <Skeleton variant={variant} animation={animation} width={width} height={height} />}
      <img
        style={{ display: !isLoading ? "block" : "none" }}
        width={width}
        height={height}
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
      />
    </Box>
  );
};

export default Image;
