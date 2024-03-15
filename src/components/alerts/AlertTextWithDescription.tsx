import React from "react";

import { AlertTextWithDescriptionProps } from "./types";
import { Text } from "components";

const AlertTextWithDescription: React.FC<AlertTextWithDescriptionProps> = ({ text, description, children }) => {
  return (
    <div>
      <Text $fontWeight="bold" textScale="body2">
        {text}
      </Text>

      {description && <Text textScale="body3">{description}</Text>}

      {React.isValidElement(children) && children}
    </div>
  );
};

export default AlertTextWithDescription;
