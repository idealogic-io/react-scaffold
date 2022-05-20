import React, { useState } from "react";

import { Button, Page, Text } from "components";

import { fontsStyles } from "theme/base";

import { useAppDispatch } from "store/store";
import { loginUser } from "store/reducers/auth/actions";

const LoginPage = () => {
  const [email, setEmail] = useState("testadmin1@gmail.com");
  const [password, setPassword] = useState("490223837aiia$A");

  const dispatch = useAppDispatch();

  const loginHandler = () => {
    const data = {
      email: email.toLowerCase(),
      password,
    };
    dispatch(loginUser(data));
  };
  return (
    <Page>
      <Text fSize="title1" as="h1" fStyle={fontsStyles.mv.bold}>
        Login page
      </Text>

      <Button onClick={loginHandler}>Login In</Button>
    </Page>
  );
};

export default LoginPage;
