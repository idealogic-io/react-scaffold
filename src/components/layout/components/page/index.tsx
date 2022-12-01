import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { getCustomMeta } from "configs";
import { Container } from "../container";
import { useTranslation } from "context";
import { PageProps } from "../types";

export const PageMeta: React.FC = () => {
  const { pathname } = useLocation();
  const { t, currentLanguage } = useTranslation();

  const { title, description, image } = getCustomMeta(pathname, t);
  const pageTitle = title ? `${title} | ${t("Scaffold")}` : t("Scaffold");

  return (
    <Helmet>
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLanguage.locale} />

      <title>{pageTitle}</title>
    </Helmet>
  );
};

export const Page: React.FC<PageProps> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <Container minHeight="100vh" {...props}>
        {children}
      </Container>
    </>
  );
};
