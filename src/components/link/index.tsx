import React from "react";

import { StyledLink } from "./StyledInternalLink";
import { LinkProps } from "./types";
import { getExternalLinkProps } from "components/button";

const Link: React.FC<LinkProps> = ({ external, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {};
  return <StyledLink $fontWeight="bold" as="a" {...internalProps} {...props} />;
};

Link.defaultProps = {
  color: "primary",
};

export default Link;
