import React, { useEffect, useRef, useState } from "react";

import { Skeleton } from "components";
import { StyledBackgroundImage } from "./styled";

import { ImageProps } from "./types";

const BackgroundImage: React.FC<ImageProps> = ({ src, width, variant, animation, aspectRatio, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const div = ref.current;

      if (src) {
        const img = document.createElement("img");

        img.onload = () => {
          div.style.backgroundImage = `url("${src}")`;
          setIsLoaded(true);
        };

        img.src = src;
      }
    }
  }, [src, ref.current]);

  return (
    <StyledBackgroundImage ref={ref} width={width} aspectRatio={aspectRatio} {...props}>
      {!isLoaded && <Skeleton variant={variant} animation={animation} width="100%" height="100%" />}
    </StyledBackgroundImage>
  );
};

export default BackgroundImage;
