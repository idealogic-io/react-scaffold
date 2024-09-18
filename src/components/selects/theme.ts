import { DefaultTheme } from "styled-components";

export const getTooltipStyles = (theme: DefaultTheme) => {
  return {
    tooltip: {
      padding: "0px",
      width: "fit-content",
      border: "none",
      background: theme.colors.transparent,
      boxShadow: theme.shadows.dropdown,
      borderRadius: "inherit",
      maxWidth: "100%",
    },
    arrow: {
      display: "none",
    },
  };
};
