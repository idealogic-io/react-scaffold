import React from "react";
import { Link as RouterLink } from "react-router-dom";
// Styling
import { StyledLink } from "./styled";
// Helpers
import { getExternalLinkProps } from "components/button";
// Types
import { LinkProps } from "./types";

const DOMAIN = process.env.REACT_APP_URL as string;

const Link: React.FC<LinkProps> = ({ external, href, ...props }) => {
  const internalProps = external ? getExternalLinkProps() : {};
  const ariaLabel = props.children && typeof props.children === "string" ? props.children : href || "link";

  if (external) {
    return <StyledLink as="a" href={href} {...internalProps} {...props} aria-label={ariaLabel} />;
  } else {
    return (
      <RouterLink to={DOMAIN + (href ?? "")} aria-label={ariaLabel}>
        <StyledLink as="span" {...internalProps} {...props} />
      </RouterLink>
    );
  }
};

Link.defaultProps = {
  underline: false,
};

export default Link;
