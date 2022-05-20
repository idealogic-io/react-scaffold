import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { DEFAULT_META, getCustomMeta } from "configs";
import { Container } from "components";
import { useLocation } from "react-router-dom";

const StyledPage = styled(Container)`
  min-height: 100vh;
  padding: 16px;
`;

export const PageMeta = () => {
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

export const Page = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};
