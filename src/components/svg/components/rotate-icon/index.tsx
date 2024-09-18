import React from "react";
import { StyledRotate } from "./styled";

import { RotateIconProps } from "./types";

export const RotateIcon: React.FC<RotateIconProps> = ({ isToggled, firstIcon, secondIcon, variant }) => {
  return (
    <StyledRotate variant={variant} isToggled={isToggled}>
      {isToggled ? firstIcon : secondIcon}
    </StyledRotate>
  );
};
