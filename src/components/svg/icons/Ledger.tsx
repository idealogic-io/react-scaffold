import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import { useThemeContext } from "context";

const Icon: React.FC<SvgProps> = ({ color = "monochrome0", ...props }) => {
  const { theme } = useThemeContext();

  return (
    <Svg viewBox="0 0 40 40" color="transparent" {...props}>
      <path
        d="M8 24.9635V30.8974H17.0274V29.5815H9.31532V24.9635H8ZM30.6847 24.9635V29.5815H22.9726V30.8971H32V24.9635H30.6847ZM17.0405 15.9334V24.9632H22.9726V23.7765H18.3559V15.9334H17.0405ZM8 9.99951V15.9334H9.31532V11.3152H17.0274V9.99951H8ZM22.9726 9.99951V11.3152H30.6847V15.9334H32V9.99951H22.9726Z"
        fill={theme.colors[color]}
      />
    </Svg>
  );
};

export default Icon;
