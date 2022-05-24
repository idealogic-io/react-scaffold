import React from "react";

import { NotFoundPageStyled } from "./styles";

import { Text, InternalLink } from "components";

import { ROUTES } from "navigation/routes";

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <Text fontSize="32px" fontStyle="bold" mb="15px">
        Not found Page 404
      </Text>
      <InternalLink to={ROUTES.landing}>Go to landing page</InternalLink>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
