export const variants = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

export const scales = {
  MD: "md",
  SM: "sm",
};

export const scaleVariants = {
  [scales.MD]: {
    height: "48px",
    width: "150px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    width: "100px",
    padding: "0 16px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
};
