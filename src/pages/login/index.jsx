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

const LoginPage = () => {
  const [isPassword, setIsPassword] = useState(true);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { validationSchema, initialValues } = useValidationSchema();

  const { fieldProps, handleSubmit, errors, isValid } = useForm({
    initialValues,
    validationSchema,
    onSubmit(values) {
      const data = {
        email: values.email.toLowerCase(),
        password: values.password,
      };

      dispatch(loginUser(data));
    },
  });

  const togglePasswordVisibleHandler = () => {
    setIsPassword(!isPassword);
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" bold>
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
