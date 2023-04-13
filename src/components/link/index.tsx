import React from "react";

import { StyledLink } from "./styled";
import { getExternalLinkProps } from "components/button";

import { LinkProps } from "./types";

const Link: React.FC<LinkProps> = ({ external, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {};

  return <StyledLink $fontWeight="bold" as="a" {...internalProps} {...props} />;
};

Link.defaultProps = {
  color: "monochrome900",
  underline: false,
};

export default Link;
