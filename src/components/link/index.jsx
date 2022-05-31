import React from "react";
import { Link } from "react-router-dom";

import { StyledInternalLink } from "./StyledInternalLink";

const InternalLink = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <StyledInternalLink>{children}</StyledInternalLink>
    </Link>
  );
};

export default InternalLink;
