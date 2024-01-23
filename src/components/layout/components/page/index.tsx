import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import { getCustomMeta } from "configs";
import { Container } from "../container";
import { useTranslation } from "react-i18next";
import { PageProps } from "../types";

export const PageMeta: React.FC = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  // eslint-disable-next-line
  console.log("pathname", i18n);

  const { title, description, image } = getCustomMeta(pathname, t);
  const pageTitle = title ? `${title} | ${t("Scaffold")}` : t("Scaffold");

  return (
    <Helmet>
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={i18n.language} />

      <title>{pageTitle}</title>
    </Helmet>
  );
};

export const Page: React.FC<PageProps> = ({ children, ...props }) => {
  return (
    <>
      <PageMeta />
      <Container {...props}>{children}</Container>
    </>
  );
};
