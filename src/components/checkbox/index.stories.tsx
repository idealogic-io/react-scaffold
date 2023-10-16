import React, { useState } from "react";
import { Checkbox, Box, Heading } from "components";
import { InfoIcon } from "components/svg";

export default {
  title: "Components/Checkboxes",
};

export const Checkboxes: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  return (
    <Box>
      <Box>
        <Checkbox
          mb="32px"
          label="Regular"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
      </Box>

      <Box>
        <Checkbox
          mb="32px"
          disabled
          label="Disabled"
          checked={isChecked1}
          onChange={() => {
            setIsChecked1(!isChecked1);
          }}
        />
      </Box>
      <Box>
        <Checkbox
          mb="32px"
          icon={<InfoIcon color="monochrome0" />}
          label="Custom Icon"
          checked={isChecked2}
          onChange={() => {
            setIsChecked2(!isChecked2);
          }}
        />
      </Box>

      <Box>
        <Checkbox
          mb="32px"
          label={
            <Heading as="h2" scale="h2" mx="32px">
              Custom Label
            </Heading>
          }
          checked={isChecked3}
          onChange={() => {
            setIsChecked3(!isChecked3);
          }}
        />
      </Box>
    </Box>
  );
};
