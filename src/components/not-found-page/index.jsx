import React from "react";

import { StyledNotFoundPage } from "./StyledNotFoundPage";

import { Text, InternalLink } from "components";

import { ROUTES } from "navigation/routes";

const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <Text fontSize="32px" bold mb="15px">
        Not found Page 404
      </Text>
      <InternalLink to={ROUTES.landing}>Go to landing page</InternalLink>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
