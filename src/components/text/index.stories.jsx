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

      <StyledText color="primary">Custom color from theme</StyledText>

      <StyledText StyledTextAlign="center">center</StyledText>

      <StyledText ellipsis width="100px">
        Ellipsis: a long StyledText with an ellipsis just for the example
      </StyledText>
    </div>
  );
};
