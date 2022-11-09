import React from "react";

import { Button as StyledButton, Box } from "components";
import { variants, scales, accentColor } from "./types";
import { AddIcon } from "components/svg";

export default {
  title: "Components/Button",
};

export const Button: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(scales).map(scale => {
          return (
            <Box key={scale} m="8px">
              {Object.values(variants).map(variant => {
                return (
                  <Box key={variant} m="8px">
                    {Object.values(accentColor).map(accentColor => {
                      return (
                        <StyledButton
                          key={accentColor}
                          startIcon={<AddIcon />}
                          accentColor={accentColor}
                          variant={variant}
                          scale={scale}
                          m="8px"
                        >
                          {accentColor}
                        </StyledButton>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Box mb="32px">
        <StyledButton startIcon={<AddIcon />} mx="8px" isLoading>
          Loading
        </StyledButton>

        <StyledButton startIcon={<AddIcon />} mx="8px" disabled>
          Disabled
        </StyledButton>

        <StyledButton startIcon={<AddIcon />} variant="secondary" mx="8px" isLoading>
          Loading
        </StyledButton>

        <StyledButton startIcon={<AddIcon />} variant="secondary" mx="8px" disabled>
          Disabled
        </StyledButton>
      </Box>

      <StyledButton as="a" href="https://google.com" external mx="8px">
        External
      </StyledButton>

      <StyledButton accentColor="accent" hsl="100" mx="8px">
        Custom color
      </StyledButton>

      <StyledButton accentColor="error" hsl="800" mx="8px">
        Custom color
      </StyledButton>
    </>
  );
};
