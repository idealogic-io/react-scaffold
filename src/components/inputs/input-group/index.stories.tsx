import React from "react";
import { InputGroup as StyledInputGroup, Input } from "components";
import { InfoIcon } from "components/svg";

export default {
  title: "Components/Inputs/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      <StyledInputGroup label="Default">
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="With Icons" startIcon={<InfoIcon />} endIcon={<InfoIcon />}>
        <Input />
      </StyledInputGroup>

      <StyledInputGroup label="Label" startIcon={<InfoIcon />} endIcon={<InfoIcon />}>
        <Input defaultValue="Disabled" disabled />
      </StyledInputGroup>

      <StyledInputGroup label="Label" error="Error" isTouched startIcon={<InfoIcon />} endIcon={<InfoIcon />}>
        <Input defaultValue="With Error" />
      </StyledInputGroup>
    </>
  );
};
