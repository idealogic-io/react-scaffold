import React from "react";
import Svg from "../Svg";

import { SvgProps } from "../types";
import { useThemeContext } from "context";

const Icon: React.FC<SvgProps> = ({ color = "monochrome900", ...props }) => {
  const { theme } = useThemeContext();

  return (
    <Svg viewBox="0 0 14 9" color="transparent" {...props}>
      <path
        d="M0.41941 1.05792C0.94261 0.522724 1.67101 0.480724 2.31061 1.05792L7.00021 5.55433L11.6898 1.05792C12.3294 0.480724 13.059 0.522724 13.5786 1.05792C14.1018 1.59192 14.0682 2.49432 13.5786 2.99592C13.0914 3.49752 7.94461 8.39833 7.94461 8.39833C7.82205 8.52535 7.67515 8.62638 7.51269 8.69538C7.35022 8.76438 7.17552 8.79995 6.99901 8.79995C6.8225 8.79995 6.6478 8.76438 6.48533 8.69538C6.32287 8.62638 6.17597 8.52535 6.05341 8.39833C6.05341 8.39833 0.90901 3.49752 0.41941 2.99592C-0.0713905 2.49432 -0.103791 1.59192 0.41941 1.05792Z"
        fill={theme.colors[color]}
      />
    </Svg>
  );
};

export default Icon;
