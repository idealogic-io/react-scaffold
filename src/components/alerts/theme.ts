import { ToastOptions } from "react-toastify";

import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "components/svg";
import { ThemedAlert, variants, Variants } from "./types";

export const toastOptionsSuccess: ToastOptions = { icon: SuccessIcon };
export const toastOptionsError: ToastOptions = { icon: ErrorIcon };
export const toastOptionsWarning: ToastOptions = { icon: WarningIcon };
export const toastOptionsInfo: ToastOptions = { icon: InfoIcon };

export const getThemeColor = ({ theme, variant = "success" }: ThemedAlert) => {
  switch (variant) {
    case variants.ERROR:
      return theme.colors.error;
    case variants.WARNING:
      return theme.colors.warning;
    case variants.SUCCESS:
      return theme.colors.success;
    case variants.INFO:
      return theme.colors.info;
  }
};

export const getIcon = (variant: Variants = "success") => {
  switch (variant) {
    case variants.ERROR:
      return ErrorIcon;
    case variants.WARNING:
      return WarningIcon;
    case variants.SUCCESS:
      return SuccessIcon;
    case variants.INFO:
      return InfoIcon;
  }
};
