import React from "react";
import { Button, Box } from "components";
import { scales, variants } from "./theme";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

export const Default = () => {
  return <Button>Default</Button>;
};

export const Disabled = () => {
  return <Button disabled>Default</Button>;
};

export const Variants = () => {
  return (
    <div>
      {Object.keys(variants).map(variant => {
        return (
          <Box key={variant} mb="32px">
            {Object.keys(scales).map(scale => {
              return (
                <Button key={scale} variant={variant} scale={scale} mr="8px">
                  {`${variant} ${scale.toUpperCase()}`}
                </Button>
              );
            })}
          </Box>
        );
      })}
    </div>
  );
};
