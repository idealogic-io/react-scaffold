import React from "react";

import { NotFoundPageStyled } from "./styles";

import { fontsStyles } from "theme/base";

import { Text, Button } from "components";

const NotFoundPage = () => {
  const redirect = () => {
    window.location.replace("/home");
  };

  return (
    <NotFoundPageStyled>
      <Text fSize="title2" fStyle={fontsStyles.mv.bold} mb="15px">
        Not found Page 404
      </Text>
      <Button onClick={redirect}>Go to home page</Button>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
