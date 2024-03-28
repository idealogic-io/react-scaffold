import Button from "components/button";
import { Column } from "components/layout";
import { useState } from "react";
import { InputCode as StyledInputCode } from ".";
import { InputGroup } from "../input-group";

export default {
  title: "Components/Inputs/InputCode",
};
const MIN_LENGTH = 6;

export const InputCode: React.FC = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, serError] = useState("");
  const [value, setValue] = useState("");

  const onUserInput = (value: string) => {
    setValue(value);
  };

  const onButtonClick = () => {
    if (error) {
      serError("");
    } else {
      serError("Error");
    }
  };

  return (
    <Column width="300px">
      <InputGroup error={error} isTouched={isTouched}>
        <StyledInputCode
          autoFocus
          cellCount={MIN_LENGTH}
          onUserInput={onUserInput}
          value={value}
          cellWidth={{ _: "44px", tablet: "56px" }}
          cellHeight={{ _: "44px", tablet: "56px" }}
          onFocus={() => setIsTouched(false)}
          onBlur={() => setIsTouched(true)}
          isFocused={isTouched === false}
          isError={!!error && !!isTouched}
        />
      </InputGroup>

      <Button onClick={onButtonClick}>Set/Reset Error</Button>
    </Column>
  );
};
