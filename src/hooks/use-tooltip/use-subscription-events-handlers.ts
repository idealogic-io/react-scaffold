import { useEffect, useState } from "react";
import { useSubscriptionEventsHandlersProps } from "./types";

export const useSubscriptionEventsHandlers = ({
  targetElement,
  tooltipElement,
  trigger,
}: useSubscriptionEventsHandlersProps) => {
  const [visible, setVisible] = useState(false);

  const hideTooltip = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(false);
  };

  const showTooltip = (e: Event) => {
    e.stopPropagation();
    e.preventDefault();
    setVisible(true);
  };

  const toggleTooltip = (e: Event) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  // Trigger = hover
  useEffect(() => {
    if (targetElement === null || trigger !== "hover") return undefined;

    targetElement.addEventListener("mouseenter", showTooltip);
    targetElement.addEventListener("mouseleave", hideTooltip);

    return () => {
      targetElement.removeEventListener("mouseenter", showTooltip);
      targetElement.removeEventListener("mouseleave", showTooltip);
    };
  }, [trigger, targetElement, hideTooltip, showTooltip]);

  // Keep tooltip open when cursor moves from the targetElement to the tooltip
  useEffect(() => {
    if (tooltipElement === null || trigger !== "hover") return undefined;

    tooltipElement.addEventListener("mouseenter", showTooltip);
    tooltipElement.addEventListener("mouseleave", hideTooltip);
    return () => {
      tooltipElement.removeEventListener("mouseenter", showTooltip);
      tooltipElement.removeEventListener("mouseleave", hideTooltip);
    };
  }, [trigger, tooltipElement, hideTooltip, showTooltip]);

  // Trigger = click
  useEffect(() => {
    if (targetElement === null || trigger !== "click") return undefined;

    targetElement.addEventListener("click", toggleTooltip);

    return () => targetElement.removeEventListener("click", toggleTooltip);
  }, [trigger, targetElement, visible, toggleTooltip]);

  // Handle click outside
  useEffect(() => {
    if (trigger !== "click") return undefined;

    const handleClickOutside = ({ target }: Event) => {
      if (target instanceof Node) {
        if (
          tooltipElement != null &&
          targetElement != null &&
          !tooltipElement.contains(target) &&
          !targetElement.contains(target)
        ) {
          setVisible(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [trigger, targetElement, tooltipElement]);

  // Trigger = focus
  useEffect(() => {
    if (targetElement === null || trigger !== "focus") return undefined;

    targetElement.addEventListener("focus", showTooltip);
    targetElement.addEventListener("blur", hideTooltip);
    return () => {
      targetElement.removeEventListener("focus", showTooltip);
      targetElement.removeEventListener("blur", hideTooltip);
    };
  }, [trigger, targetElement, showTooltip, hideTooltip]);

  return { visible };
};
