import React from "react";
import { Svg } from "components";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = props => {
  return (
    <Svg viewBox="0 0 20 14" {...props}>
      <path d="M13 7C13 8.65685 11.6569 10 10 10C8.34315 10 7 8.65685 7 7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z" />
      <path d="M19.8944 6.55279C17.7362 2.23635 13.9031 0 10 0C6.09687 0 2.26379 2.23635 0.105573 6.55279C-0.0351909 6.83431 -0.0351909 7.16569 0.105573 7.44721C2.26379 11.7637 6.09687 14 10 14C13.9031 14 17.7362 11.7637 19.8944 7.44721C20.0352 7.16569 20.0352 6.83431 19.8944 6.55279ZM10 12C7.03121 12 3.99806 10.3792 2.12966 7C3.99806 3.62078 7.03121 2 10 2C12.9688 2 16.0019 3.62078 17.8703 7C16.0019 10.3792 12.9688 12 10 12Z" />
    </Svg>
  );
};

export default Icon;
