import React from "react";
import { AnimatePresence } from "framer-motion";

import AlertTextWithDescription from "./AlertTextWithDescription";
import { StyledAlertBanner } from "./styled";
import { Flex } from "components";
import { CloseIconWithHover } from "components/svg";

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
          transition={{ duration: 0.3 }}
          variant={variant}
        >
          <Icon mr="10px" />

          <Flex flexGrow={1}>
            <AlertTextWithDescription text={text} description={description}>
              {children}
            </AlertTextWithDescription>
          </Flex>

          {onCloseClick && <CloseIconWithHover onClick={onCloseClick} />}
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
