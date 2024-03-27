import isPropValid from "@emotion/is-prop-valid";
import { StyledTarget } from "styled-components/dist/types";

// In new v6 version of styled-components shouldForwardProp is no longer provided by default
export const shouldForwardProp = (propName: string, target: StyledTarget<"web">) => {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
};
