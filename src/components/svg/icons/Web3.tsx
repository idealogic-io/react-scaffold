import React from "react";
import { Svg } from "components";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = ({ color = "accent900", ...props }) => {
  return (
    <Svg viewBox="0 0 48 48" {...props} color={color}>
      <mask id="mask0_505_9" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
        <path d="M48 0H0V48H48V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_505_9)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.1611 -0.234299L9.25635 24.3128L23.704 32.8118L24.1611 33.0798L39.0645 24.3128L24.1611 -0.234299ZM23.2602 30.4622L12.4702 24.1143L23.2602 19.3542V30.4622ZM12.7543 22.0218L23.2602 17.3862V4.71675L12.7543 22.0218ZM25.0605 17.3862V4.71675L35.5678 22.0218L25.0605 17.3862ZM25.0605 19.3542L35.8521 24.1143L25.0605 30.4622V19.3542Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.957 26.4383L9.76599 27.7346L24.161 48.0572L38.5561 27.7346L37.3652 26.4383L24.161 34.2056L10.957 26.4383ZM13.6582 30.1164L23.2601 35.765V43.6721L13.6582 30.1164ZM25.0604 35.765V43.6721L34.6625 30.1164L25.0604 35.765Z"
        />
      </g>
    </Svg>
  );
};

export default Icon;
