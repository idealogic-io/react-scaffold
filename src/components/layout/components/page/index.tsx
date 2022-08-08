import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { getCustomMeta } from "configs";
import { Container } from "../container";
import { useTranslation } from "context";

const StyledPage = styled(Container)`
  min-height: 100vh;
  padding: 16px;
`;

export const PageMeta: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const { title, description, image } = getCustomMeta(pathname, t);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export const Page: React.FC<PropsWithChildren<{}>> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <StyledPage {...props}>{children}</StyledPage>
    </>
  );
};
