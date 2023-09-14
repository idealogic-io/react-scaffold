import { css } from "styled-components";
import { scales } from "./types";

export const fontSizes = {
  [scales.h1]: {
    mobile: "24px",
    tablet: "28px",
    laptop: "32px",
  },
  [scales.h2]: {
    mobile: "22px",
    tablet: "24px",
    laptop: "28px",
  },
  [scales.h3]: {
    mobile: "18px",
    tablet: "20px",
    laptop: "24px",
  },
  [scales.h4]: {
    mobile: "14px",
    tablet: "16px",
    laptop: "20px",
  },
  [scales.h5]: {
    mobile: "12px",
    tablet: "14px",
    laptop: "16px",
  },
  [scales.h6]: {
    mobile: "10px",
    tablet: "12px",
    laptop: "14px",
  },
};

export const styles = {
  [scales.h1]: css`
    line-height: 1.28;
  `,
  [scales.h2]: css`
    line-height: 1.25;
  `,
  [scales.h3]: css`
    line-height: 1.25;
  `,
  [scales.h4]: css`
    line-height: 1.2;
  `,
  [scales.h5]: css`
    line-height: 1.375;
  `,
  [scales.h6]: css`
    line-height: 1.42;
  `,
};
