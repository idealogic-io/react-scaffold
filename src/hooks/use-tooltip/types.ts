import { Placement, Padding } from "@popperjs/core";

export interface TooltipRefs {
  targetRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  tooltip: React.ReactNode;
  tooltipVisible: boolean;
  setVisible: (arg: boolean) => void;
}

export type TriggerType = "click" | "hover" | "focus";

export interface TooltipOptions {
  placement?: Placement;
  trigger?: TriggerType;
  arrowPadding?: Padding;
  tooltipPadding?: Padding;
  tooltipOffset?: [number, number];
  isEllipsis?: boolean;
  isInitiallyOpened?: boolean;
  customStyles?: { tooltip?: object; arrow?: object };
}

export type useSubscriptionEventsHandlersProps = {
  targetElement: HTMLElement | null;
  tooltipElement: HTMLElement | null;
  trigger: TriggerType;
  isInitiallyOpened?: boolean;
};
