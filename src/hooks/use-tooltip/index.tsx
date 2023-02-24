import React, { useState } from "react";
import { usePopper } from "react-popper";
import { AnimatePresence } from "framer-motion";

import { Arrow, StyledTooltip } from "./StyledTooltip";
import { TooltipOptions, TooltipRefs } from "./types";
import { useSubscriptionEventsHandlers } from "./use-subscription-events-handlers";
import { checkIsEllipsis } from "utils";
import { appearanceAnimationMap, appearanceAnimationVariants } from "theme";

const useTooltip = (content: React.ReactNode, options?: TooltipOptions): TooltipRefs => {
  const {
    placement = "auto",
    trigger = "hover",
    arrowPadding = 16,
    tooltipPadding = { left: 16, right: 16 },
    tooltipOffset = [0, 10],
    isEllipsis = false,
  } = options ?? {};
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipElement, setTooltipElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const { visible } = useSubscriptionEventsHandlers({ targetElement, tooltipElement, trigger });

  const { styles, attributes } = usePopper(targetElement, tooltipElement, {
    placement,
    modifiers: [
      {
        name: "arrow",
        options: { element: arrowElement, padding: arrowPadding },
      },
      { name: "offset", options: { offset: tooltipOffset } },
      { name: "preventOverflow", options: { padding: tooltipPadding } },
    ],
  });

  const tooltip = (
    <StyledTooltip
      key="tooltip"
      {...appearanceAnimationMap}
      variants={appearanceAnimationVariants}
      transition={{ duration: 0.3 }}
      ref={setTooltipElement}
      style={styles.popper}
      {...attributes.popper}
    >
      <>{content || targetElement?.innerHTML}</>
      <Arrow
        ref={setArrowElement}
        style={{ ...styles.arrow, transform: styles.arrow.transform && `${styles.arrow.transform} rotate(45deg)` }}
      />
    </StyledTooltip>
  );

  const AnimatedTooltip = (
    <AnimatePresence>
      {isEllipsis ? checkIsEllipsis(targetElement) && visible && tooltip : visible && tooltip}
    </AnimatePresence>
  );

  return {
    targetRef: setTargetElement,
    tooltip: AnimatedTooltip,
    tooltipVisible: visible,
  };
};

export default useTooltip;
