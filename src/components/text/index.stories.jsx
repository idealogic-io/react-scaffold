import React from "react";
import { Text } from "components";

export default {
  title: "Components/Text",
  component: Text,
  argTypes: {},
};

export const Default = () => {
  return (
    <div>
      <Text>Default</Text>

      <Text $fontWeight="bold">Bold text</Text>

      <Text $fontWeight="medium">Medium text</Text>

      <Text fontSize="12px">Small text</Text>

      <Text color="primary">Custom color from theme</Text>

      <Text textAlign="center">center</Text>

      <Text ellipsis width="100px">
        Ellipsis: a long text with an ellipsis just for the example
      </Text>
    </div>
  );
};
