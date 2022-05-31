import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { DEFAULT_META, getCustomMeta } from "configs";
import { Container } from "../container";
import { FCWithChildren } from "types";

const StyledPage = styled(Container)`
  min-height: 100vh;
  padding: 16px;
`;

export const PageMeta: React.FC = () => {
  const { pathname } = useLocation();

  const pageMeta = getCustomMeta(pathname) || {};
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta };

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export const Page: React.FC<FCWithChildren> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};
