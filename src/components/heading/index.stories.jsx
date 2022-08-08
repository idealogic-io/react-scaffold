import React from "react";
import { Box, Heading } from "components";
import { scales } from "./theme";

export default {
  title: "Components/Headings",
};

export const Headings = () => {
  return (
    <>
      <Box my="16px">
        {Object.values(scales).map((scale, indx) => {
          return (
            <Heading key={indx} scale={scale} as={scale}>
              {`${scale.toUpperCase()}`}
            </Heading>
          );
        })}
      </Box>
    </>
  );
};
