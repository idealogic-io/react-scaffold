import { css } from "styled-components";
import { system, Config } from "styled-system";

import { scales } from "./types";
import { fontWeight } from "theme/base";
import { FontWeight } from "theme/types";

export const styles = {
  [scales.body1]: css`
    font-size: 24px;
    line-height: 1.7;
  `,
  [scales.body2]: css`
    font-size: 20px;
    line-height: 1.6;
  `,
  [scales.body3]: css`
    font-size: 18px;
    line-height: 1.5;
  `,
  [scales.caption1]: css`
    font-size: 16px;
    line-height: 1.4;
  `,
  [scales.caption2]: css`
    font-size: 14px;
    line-height: 1.3;
  `,
};

const config: Config = {
  $fontWeight: {
    property: "fontWeight",
    transform: (value: keyof FontWeight) => {
      return fontWeight[value];
    },
  },
};

export const fontWeights = system(config);
