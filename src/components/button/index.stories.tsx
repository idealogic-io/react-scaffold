import React from "react";

import { Button, Box, Flex } from "components";
import { variants, scales } from "./types";
import { AddIcon } from "components/svg";

export default {
  title: "Components/Buttons",
};

export const Buttons: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map(scale => {
                return (
                  <Button key={scale} variant={variant} scale={scale} m="8px">
                    {`${variant} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Flex mb="32px" alignContent="center">
        <Button mx="8px" isLoading>
          Loading
        </Button>

        <Button mx="8px" disabled>
          Disabled
        </Button>

        <Button mx="8px" variant="outline" disabled>
          Disabled
        </Button>

        <Button mx="8px" variant="outline" isLoading>
          Loading
        </Button>
      </Flex>

      <Box mb="32px">
        <Button as="a" href="https://google.com" external mx="8px">
          External
        </Button>
      </Box>

      <Box mb="32px">
        <Button color="error500" hoverColor="error800" mx="8px">
          Custom color with hover color
        </Button>

        <Button color="success500" hoverColor="success800" variant="outline" mx="8px">
          Custom color with hover color
        </Button>

        <Button color="error500" mx="8px">
          Custom color
        </Button>

        <Button color="success500" variant="outline" mx="8px">
          Custom color
        </Button>
      </Box>

      <Box mb="32px">
        <Button startIcon={<AddIcon />} mx="8px">
          With Icon
        </Button>

        <Button startIcon={<AddIcon />} variant="outline" mx="8px">
          With Icon
        </Button>
      </Box>

      <Box mb="32px">
        <Button disabled startIcon={<AddIcon />} mx="8px">
          Disabled With Icon
        </Button>

        <Button disabled startIcon={<AddIcon />} variant="outline" mx="8px">
          Disabled With Icon
        </Button>
      </Box>
    </>
  );
};
