import React from "react";
import { AnimatePresence } from "framer-motion";

import AlertTextWithDescription from "./AlertTextWithDescription";
import { StyledAlertBanner, StylesCloseIcon } from "./styled";
import { Box, Flex } from "components";
import { CloseIcon } from "components/svg";

import { getIcon } from "./theme";
import { appearanceAnimationMap, appearanceAnimationVariants } from "theme";

import { AlertBannerProps } from "./types";

const AlertBanner: React.FC<AlertBannerProps> = ({ children, text, description, variant, visible, onCloseClick }) => {
  const Icon = getIcon(variant);

  return (
    <AnimatePresence>
      {visible && (
        <StyledAlertBanner
          key="alertBanner"
          {...appearanceAnimationMap}
          variants={appearanceAnimationVariants}
          transition={{ duration: 0.5 }}
          variant={variant}
        >
          <Box mr="10px">
            <Icon />
          </Box>

          <Flex flexGrow={1}>
            <AlertTextWithDescription text={text} description={description}>
              {children}
            </AlertTextWithDescription>
          </Flex>

          {onCloseClick && (
            <StylesCloseIcon onClick={onCloseClick}>
              <CloseIcon height="20px" />
            </StylesCloseIcon>
          )}
        </StyledAlertBanner>
      )}
    </AnimatePresence>
  );
};

AlertBanner.defaultProps = {
  variant: "success",
  visible: true,
};

export default AlertBanner;
