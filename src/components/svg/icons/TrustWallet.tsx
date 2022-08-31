import React from "react";
import { Svg } from "components";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = ({ color = "transparent", ...props }) => {
  return (
    <Svg viewBox="0 0 103 114" {...props} color={color}>
      <path
        d="M96.8752 18.6055C73.8818 20.63 63.2839 17.7474 51.7949 5.72883C51.4143 5.33061 50.7755 5.30752 50.368 5.67833C36.7548 18.0683 27.0059 21.3846 6.37963 18.6498C5.79539 18.5723 5.25939 18.9961 5.23456 19.5849C4.03013 48.1454 5.85111 94.4601 50.7926 108.403C50.9932 108.465 51.2209 108.462 51.4194 108.393C97.3714 92.5176 96.6873 46.4131 97.9801 19.6408C98.0095 19.0317 97.4827 18.552 96.8752 18.6055Z"
        stroke="#3375BB"
        strokeWidth="10"
      />
    </Svg>
  );
};

export default Icon;
