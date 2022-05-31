import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { StyledInternalLink } from "./StyledInternalLink";

const InternalLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <StyledInternalLink>{children}</StyledInternalLink>
    </Link>
  );
};

export default InternalLink;
