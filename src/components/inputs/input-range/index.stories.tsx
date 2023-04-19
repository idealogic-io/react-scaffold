import React, { useState } from "react";

import { Box, InputRange as StyledInputRange } from "components";

export default {
  title: "Components/Inputs/InputRange",
};

export const InputRange: React.FC = () => {
  const [value1, setValue1] = useState(20);
  const [value2, setValue2] = useState(10);

  return (
    <>
      <Box mt="50px">
        <StyledInputRange value={value1} onValueChanged={setValue1} />
      </Box>
      <Box mt="50px">
        <StyledInputRange value={value2} onValueChanged={setValue2} disabled />
      </Box>
    </>
  );
};
