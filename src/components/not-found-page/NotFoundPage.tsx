import React from "react";

import { StyledNotFoundPage } from "./StyledNotFoundPage";

import { Heading, Link } from "components";

import { ROUTES } from "navigation/routes";

const NotFoundPage: React.FC = () => {
  return (
    <StyledNotFoundPage>
      <Heading mb="15px">Not found Page 404</Heading>
      <Link href={ROUTES.landing}>Go to landing page</Link>
    </StyledNotFoundPage>
  );
};

export default NotFoundPage;
