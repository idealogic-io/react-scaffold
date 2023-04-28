import React from "react";
import { InputGroup as StyledInputGroup, Input } from "components";

import { CopyIcon } from "components/svg";

export default {
  title: "Components/Inputs/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      <StyledInputGroup label="Default">
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="With Icons" startIcon={<CopyIcon />} endIcon={<CopyIcon />}>
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="Label" startIcon={<CopyIcon />} endIcon={<CopyIcon />}>
        <Input value="Disabled" disabled />
      </StyledInputGroup>

      <StyledInputGroup label="Label" error="Error" isTouched startIcon={<CopyIcon />} endIcon={<CopyIcon />}>
        <Input value="With Error" />
      </StyledInputGroup>
    </>
  );
};
