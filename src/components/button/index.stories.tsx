import React from "react";

import { Button as StyledButton, Box } from "components";
import { Variant, Scale, variants, scales } from "./types";

export default {
  title: "Components/Button",
};

export const Button: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale, indx) => {
                return (
                  <StyledButton key={indx} variant={variant as Variant} scale={scale as Scale} mr="8px">
                    {`${variant} ${scale.toUpperCase()}`}
                  </StyledButton>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box mb="32px">
        <StyledButton mr="8px" disabled>
          Disabled
        </StyledButton>
        <StyledButton variant="secondary" mr="8px" disabled>
          Disabled
        </StyledButton>
      </Box>

      <StyledButton as="a" href="https://google.com" external>
        External
      </StyledButton>
    </>
  );
};
