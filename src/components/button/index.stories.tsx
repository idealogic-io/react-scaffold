import React from "react";

import { Button, Box, Row } from "components";
import { variants, scales } from "./types";
import { CopyIcon } from "components/svg";

export default {
  title: "Components/Buttons",
};

export const Buttons: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Row alignItems="center" key={variant} mb="32px">
              {Object.values(scales).map((scale, i) => {
                return (
                  <Button
                    key={scale}
                    variant={variant}
                    scale={scale}
                    m="8px"
                    startIcon={i === 1 && <CopyIcon />}
                    endIcon={i === 2 && <CopyIcon />}
                  >
                    {`${variant} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Row>
          );
        })}
      </Box>

      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Row alignItems="center" key={variant} mb="32px">
              {Object.values(scales).map((scale, i) => {
                return (
                  <Button key={scale} variant={variant} scale={scale} m="8px" isLoading>
                    {`${variant} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Row>
          );
        })}
      </Box>

      <Box mb="32px">
        {Object.values(variants).map(variant => {
          return (
            <Row alignItems="center" key={variant} mb="32px">
              {Object.values(scales).map((scale, i) => {
                return (
                  <Button
                    key={scale}
                    variant={variant}
                    scale={scale}
                    m="8px"
                    startIcon={i === 1 && <CopyIcon />}
                    endIcon={i === 2 && <CopyIcon />}
                    disabled
                  >
                    Disabled
                  </Button>
                );
              })}
            </Row>
          );
        })}
      </Box>

      <Box mb="32px">
        <Button as="a" href="https://google.com" external mx="8px">
          External
        </Button>
      </Box>

      <Box mb="32px">
        <Button color="error500" hoverColor="error600" mx="8px">
          Custom color
        </Button>

        <Button color="error500" hoverColor="error600" variant="outline" mx="8px">
          Custom color
        </Button>
      </Box>
    </>
  );
};
