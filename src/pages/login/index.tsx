import React, { useState } from "react";
// Components
import { Box, Button, Input, Page, Text, InputGroup, Column } from "components";
import { AddIcon } from "components/svg";
// Store
import { useAppDispatch } from "store/store";

import { loginUser } from "store/reducers/auth/actions";
// Context
import { useTranslation } from "context";
// Hooks
import { useForm } from "hooks";
import { useValidationSchema } from "./hooks";

const LoginPage: React.FC = () => {
  const [isPassword, setIsPassword] = useState(true);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { validationSchema, initialValues } = useValidationSchema();

  const { fieldProps, handleSubmit, errors, isValid } = useForm({
    initialValues,
    validationSchema,
    onSubmit(values) {
      handleLogin(values.email, values.password);
    },
  });

  const handleLogin = async (email: string, password: string) => {
    dispatch(loginUser({ email: email.toLowerCase(), password: password }));
  };

  const togglePasswordVisibleHandler = () => {
    setIsPassword(!isPassword);
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" fontStyle="bold">
        {t("Login Page")}
      </Text>
      <Box width="300px" py="16px">
        <form onSubmit={handleSubmit}>
          <Column>
            <Input {...fieldProps("email")} />
            <Text my="4px">{errors.email}</Text>

            <InputGroup
              startIcon={<AddIcon width="18px" />}
              endIcon={<AddIcon width="18px" cursor="pointer" onClick={togglePasswordVisibleHandler} />}
            >
              <Input {...fieldProps("password")} type={isPassword ? "password" : "text"} />
            </InputGroup>
            <Text my="4px">{errors.password}</Text>

            <Button disabled={!isValid} type="submit">
              {t("Login")}
            </Button>
          </Column>
        </form>
      </Box>
    </Page>
  );
};

export default LoginPage;
