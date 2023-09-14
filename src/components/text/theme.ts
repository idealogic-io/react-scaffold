import { css } from "styled-components";
import { scales } from "./types";

export const fontSizes = {
  [scales.body1]: {
    mobile: "18px",
    tablet: "20px",
    laptop: "24px",
  },
  [scales.body2]: {
    mobile: "16px",
    tablet: "18px",
    laptop: "20px",
  },
  [scales.body3]: {
    mobile: "12px",
    tablet: "14px",
    laptop: "16px",
  },
  [scales.caption1]: {
    mobile: "14px",
    tablet: "14px",
    laptop: "14px",
  },
  [scales.caption2]: {
    mobile: "12px",
    tablet: "12px",
    laptop: "12px",
  },
};

export const styles = {
  [scales.body1]: css`
    line-height: 1.7;
  `,
  [scales.body2]: css``,
  [scales.body3]: css``,
  [scales.caption1]: css``,
  [scales.caption2]: css``,
};
