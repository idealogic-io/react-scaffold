import React from "react";
import { InputGroup as StyledInputGroup, Input } from "components";
import { scales } from "components/input/types";
import { AddIcon } from "components/svg";

export default {
  title: "Components/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      {Object.values(scales).map(scale => (
        <StyledInputGroup
          key={scale}
          scale={scale}
          label="Label"
          error="Error"
          isTouched={true}
          my="16px"
          startIcon={<AddIcon />}
          endIcon={<AddIcon />}
        >
          <Input />
        </StyledInputGroup>
      ))}
    </>
  );
};
