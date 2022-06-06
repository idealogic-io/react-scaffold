import React from "react";
import { Button, Box } from "components";
import { scaleVariants, styleVariants } from "./theme";
import { Variant, Scale } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

export const Default: React.FC = () => {
  return <Button>Default</Button>;
};

export const Disabled: React.FC = () => {
  return <Button disabled>Default</Button>;
};

export const Variants: React.FC = () => {
  return (
    <div>
      {Object.keys(styleVariants).map(variant => {
        return (
          <Box key={variant} mb="32px">
            {Object.keys(scaleVariants).map((scale, indx) => {
              return (
                <Button key={indx} variant={variant as Variant} scale={scale as Scale} mr="8px">
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
