import React, { useState } from "react";
// Components
import { Box, Button, Input, Page, Text, InputGroup } from "components";
import { AddIcon } from "components/svg";
// Store
import { useAppDispatch } from "store/store";
import { loginUser } from "store/reducers";
// Context
import { useTranslation } from "context";

const LoginPage = () => {
  const [state, setState] = useState({
    email: "testadmin1@gmail.com",
    password: "490223837aiia$A",
    isPassword: true,
  });

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const loginHandler = () => {
    const data = {
      email: state.email.toLowerCase(),
      password: state.password,
    };
    dispatch(loginUser(data));
  };

  const togglePasswordVisibleHandler = () => {
    setState(prev => ({ ...prev, isPassword: !state.isPassword }));
  };

  const onEmailChangeHandler = ({ target: { value } }) => {
    setState(prev => ({ ...prev, email: value }));
  };

  const onPasswordChangeHandler = ({ target: { value } }) => {
    setState(prev => ({ ...prev, password: value }));
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" fontStyle="bold">
        {t("Login Page")}
      </Text>
      <Box width="300px" py="16px">
        <Input value={state.email} mb="16px" onChange={onEmailChangeHandler} />
        <InputGroup
          startIcon={<AddIcon width="18px" />}
          endIcon={<AddIcon width="18px" cursor="pointer" onClick={togglePasswordVisibleHandler} />}
        >
          <Input
            type={state.isPassword ? "password" : "text"}
            value={state.password}
            onChange={onPasswordChangeHandler}
          />
        </InputGroup>
      </Box>

      <Button onClick={loginHandler}>{t("Login")}</Button>
    </Page>
  );
};

export default LoginPage;
