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
      {Object.values(variants).map(variant => {
        return (
          <Box key={variant} mb="32px">
            {Object.values(scales).map(scale => {
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
