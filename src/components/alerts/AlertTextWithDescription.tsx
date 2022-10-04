import React from "react";

import { AlertTextWithDescriptionProps } from "./types";
import { Box, Text } from "components";

const AlertTextWithDescription: React.FC<AlertTextWithDescriptionProps> = ({ text, description, children }) => {
  return (
    <Box>
      <Text $fontWeight="bold">{text}</Text>
      {description && <Text fontSize="12px">{description}</Text>}
      {React.isValidElement(children) && children}
    </Box>
  );
};

export default AlertTextWithDescription;
