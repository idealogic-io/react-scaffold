import React from "react";
import { StyledRotate } from "./styled";
import { Box } from "components";

import { RotateIconProps } from "./types";

export const RotateIcon: React.FC<RotateIconProps> = ({ isToggled, firstIcon, secondIcon, ...props }) => {
  return (
    <Box cursor="pointer">
      <StyledRotate {...props} isToggled={isToggled}>
        {isToggled ? firstIcon : secondIcon}
      </StyledRotate>
    </Box>
  );
};
