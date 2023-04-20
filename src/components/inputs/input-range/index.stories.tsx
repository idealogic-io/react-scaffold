import React, { useState } from "react";

import { Box, InputRange as StyledInputRange, Text } from "components";

export default {
  title: "Components/Inputs/InputRange",
};

export const InputRange: React.FC = () => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(50);
  const [value3, _] = useState(10);

  return (
    <>
      <Box mt="50px">
        <Text>Value will be set after `mouseup` event </Text>
        <Text textAlign="center">{value1}</Text>
        <StyledInputRange value={value1} onFinishDrag={setValue1} />
      </Box>

      <Box mt="50px">
        <Text>Value will be set after `onchange` event</Text>
        <Text textAlign="center">{value2}</Text>
        <StyledInputRange value={value2} onValueChanged={setValue2} />
      </Box>

      <Box mt="50px">
        <Text>Disabled</Text>
        <Text textAlign="center">{value3}</Text>
        <StyledInputRange value={value3} disabled />
      </Box>
    </>
  );
};
