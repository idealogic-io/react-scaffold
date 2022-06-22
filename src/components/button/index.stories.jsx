import React from "react";
import { Button, Box } from "components";
import { scaleVariants, styleVariants } from "./theme";

export default {
  title: "Components/Button",

  argTypes: {},
};

export const Default = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.keys(styleVariants).map(variant => {
          return (
            <Box key={variant} mb="32px">
              {Object.keys(scaleVariants).map((scale, indx) => {
                return (
                  <Button key={indx} variant={variant} scale={scale} mr="8px">
                    {`${variant} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button mr="8px" disabled>
          Disabled
        </Button>
        <Button variant="secondary" mr="8px" disabled>
          Disabled
        </Button>
      </Box>
    </>
  );
};
