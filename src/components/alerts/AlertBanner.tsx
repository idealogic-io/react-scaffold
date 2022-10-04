import React from "react";

import AlertTextWithDescription from "./AlertTextWithDescription";
import { StyledAlertBanner, StylesCloseIcon } from "./StyledAlertBanner";
import { Box, Flex } from "components";
import { CloseIcon } from "components/svg";

import { getIcon } from "./theme";
import { AlertBannerProps } from "./types";

const AlertBanner: React.FC<AlertBannerProps> = ({ children, text, description, variant, onCloseClick }) => {
  const Icon = getIcon(variant);
  return (
    <StyledAlertBanner variant={variant}>
      <Box mr="10px">
        <Icon />
      </Box>

      <Flex flexGrow={1}>
        <AlertTextWithDescription text={text} description={description}>
          {children}
        </AlertTextWithDescription>
      </Flex>

      <StylesCloseIcon onClick={onCloseClick}>
        <CloseIcon height="20px" />
      </StylesCloseIcon>
    </StyledAlertBanner>
  );
};

AlertBanner.defaultProps = {
  variant: "success",
};

export default AlertBanner;
