import React from "react";
import { InputGroup as StyledInputGroup, Input } from "components";

import { AddIcon } from "components/svg";

export default {
  title: "Components/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      <StyledInputGroup
        label="Label"
        error="Error"
        isTouched={true}
        my="16px"
        startIcon={<AddIcon />}
        endIcon={<AddIcon />}
        disabled
      >
        <Input value="Disabled" />
      </StyledInputGroup>

      <StyledInputGroup
        label="Label"
        error="Error"
        isTouched={true}
        my="16px"
        startIcon={<AddIcon />}
        endIcon={<AddIcon />}
      >
        <Input value="With Error" />
      </StyledInputGroup>
    </>
  );
};
