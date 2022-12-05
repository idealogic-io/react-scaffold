import React from "react";
import { Text as StyledText } from "components";

export default {
  title: "Components/Text",
};

export const Text = () => {
  return (
    <div>
      <StyledText>Default</StyledText>

      <StyledText $fontWeight="bold">Bold StyledText</StyledText>

      <StyledText $fontWeight="medium">Medium StyledText</StyledText>

      <StyledText fontSize="12px">Small StyledText</StyledText>

      <StyledText color="accent100">Custom color from theme</StyledText>

      <StyledText textAlign="center">center</StyledText>

      <StyledText ellipsis width="100px">
        Ellipsis: a long StyledText with an ellipsis just for the example
      </StyledText>
      <StyledText fontSize={["12px", "16px", "22px"]}>Width media queries in markup as array</StyledText>
      <StyledText fontSize={{ mobileS: 14, mobileL: 18, tablet: 24 }}>Width media queries in markup as obj</StyledText>
    </div>
  );
};
