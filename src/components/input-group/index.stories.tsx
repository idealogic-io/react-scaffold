import React from "react";
import { InputGroup as StyledInputGroup, Input, Row } from "components";
import { scales } from "components/input/types";
import { AddIcon } from "components/svg";

export default {
  title: "Components/InputGroup",
};

export const InputGroup: React.FC = () => {
  return (
    <>
      {Object.values(scales).map(scale => (
        <Row key={scale}>
          <StyledInputGroup
            scale={scale}
            label={"Label"}
            error={"Error here"}
            isTouched={true}
            startIcon={<AddIcon />}
            endIcon={<AddIcon />}
          >
            <Input value="Text here" />
          </StyledInputGroup>
        </Row>
      ))}
    </>
  );
};
