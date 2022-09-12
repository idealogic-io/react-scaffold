import React, { useState } from "react";

import { InputNumeric as StyledInput, Text } from "components";

export default {
  title: "Components/InputNumeric",
};

export const InputNumeric: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <Text>Only numbers</Text>
      <StyledInput value={value} onUserInput={setValue} />
    </>
  );
};
