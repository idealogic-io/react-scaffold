import React from "react";
import { InputGroup as StyledInputGroup, Input } from "components";

import { AddIcon } from "components/svg";

export default {
  title: "Components/Inputs/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      <StyledInputGroup label="Default">
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="With Icons" startIcon={<AddIcon />} endIcon={<AddIcon />}>
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="Label" startIcon={<AddIcon />} endIcon={<AddIcon />}>
        <Input value="Disabled" disabled />
      </StyledInputGroup>

      <StyledInputGroup label="Label" error="Error" isTouched startIcon={<AddIcon />} endIcon={<AddIcon />}>
        <Input value="With Error" />
      </StyledInputGroup>
    </>
  );
};
