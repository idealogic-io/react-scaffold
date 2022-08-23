import React from "react";

import { StyledNotFoundPage } from "./StyledNotFoundPage";

import { Heading, InternalLink } from "components";

import { ROUTES } from "navigation/routes";

const NotFoundPage: React.FC = () => {
  return (
    <StyledNotFoundPage>
      <Heading mb="15px">Not found Page 404</Heading>
      <InternalLink href={ROUTES.landing}>Go to landing page</InternalLink>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
