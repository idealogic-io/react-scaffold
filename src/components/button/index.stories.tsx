import React from "react";

import { Button as StyledButton, Box, Flex } from "components";
import { variants, scales } from "./types";
import { AddIcon } from "components/svg";

export default {
  title: "Components/Button",
};

export const Button: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map(scale => {
                return (
                  <StyledButton key={scale} variant={variant} scale={scale} m="8px">
                    {`${variant} ${scale.toUpperCase()}`}
                  </StyledButton>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Flex mb="32px" alignContent="center">
        <StyledButton mx="8px" isLoading>
          Loading
        </StyledButton>

        <StyledButton mx="8px" disabled>
          Disabled
        </StyledButton>

        <StyledButton mx="8px" variant="outline" disabled>
          Disabled
        </StyledButton>

        <StyledButton mx="8px" variant="outline" isLoading>
          Loading
        </StyledButton>
      </Flex>

      <Box mb="32px">
        <StyledButton as="a" href="https://google.com" external mx="8px">
          External
        </StyledButton>
      </Box>

      <Box mb="32px">
        <StyledButton color="error500" hoverColor="error800" mx="8px">
          Custom color with hover color
        </StyledButton>

        <StyledButton color="success500" hoverColor="success800" variant="outline" mx="8px">
          Custom color with hover color
        </StyledButton>

        <StyledButton color="error500" mx="8px">
          Custom color
        </StyledButton>

        <StyledButton color="success500" variant="outline" mx="8px">
          Custom color
        </StyledButton>
      </Box>

      <Box mb="32px">
        <StyledButton startIcon={<AddIcon />} mx="8px">
          With Icon
        </StyledButton>

        <StyledButton startIcon={<AddIcon />} variant="outline" mx="8px">
          With Icon
        </StyledButton>
      </Box>

      <Box mb="32px">
        <StyledButton disabled startIcon={<AddIcon />} mx="8px">
          Disabled With Icon
        </StyledButton>

        <StyledButton disabled startIcon={<AddIcon />} variant="outline" mx="8px">
          Disabled With Icon
        </StyledButton>
      </Box>
    </>
  );
};
