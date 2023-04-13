import React from "react";
import { Text, Box } from "components";
import { scales } from "./types";

export default {
  title: "Components/Text",
};

export const Texts = () => {
  return (
    <>
      {Object.values(scales).map(scale => {
        return (
          <Box key={scale}>
            <Text textScale={scale}>{scale}</Text>
            <hr />
          </Box>
        );
      })}

      <Text scale="body1" $fontWeight="bold">
        Custom Font weight
      </Text>
      <hr />

      <Text scale="body1" color="accent100">
        Custom color
      </Text>
      <hr />

      <Text scale="body1" ellipsis width="100px">
        Ellipsis: a long Text with an ellipsis just for the example
      </Text>
      <hr />

      <Text scale="body1" textAlign="center">
        Align center
      </Text>
      <hr />

      <Text fontSize={{ _: "12px", tablet: "16px", laptop: "24px" }}>Size with media queries</Text>
      <hr />

      <Text direction="rtl">Direction rtl</Text>
      <hr />
    </>
  );
};
