import React, { useState } from "react";
// Components
import { Box, Button, Input, Page, InputGroup, Column, Heading } from "components";
import { AddIcon } from "components/svg";
// Store
import { useAppDispatch, useAppSelector } from "store/store";
import { loginUser } from "store/auth/actions";
// Context
import { useTranslation } from "context";
// Hooks
import { useForm } from "hooks";
import { useValidationSchema } from "./hooks";

const LoginPage: React.FC = () => {
  const { pending } = useAppSelector(state => state.auth);

  const [isPassword, setIsPassword] = useState(true);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { validationSchema, initialValues } = useValidationSchema();

  const { fieldProps, handleSubmit, errors, touched, isValid } = useForm({
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
      <Heading>{t("Login Page")}</Heading>
      <Box width="300px" py="16px">
        <form onSubmit={handleSubmit}>
          <Column>
            <InputGroup label={t("Email")} error={errors.email} isTouched={touched.email}>
              <Input {...fieldProps("email")} placeholder={t("Email")} />
            </InputGroup>

            <InputGroup
              endIcon={<AddIcon width="18px" cursor="pointer" onClick={togglePasswordVisibleHandler} />}
              label={t("Password")}
              error={errors.password}
              isTouched={touched.password}
            >
              <Input {...fieldProps("password")} type={isPassword ? "password" : "text"} placeholder={t("Password")} />
            </InputGroup>

            <Button disabled={!isValid} type="submit" isLoading={pending}>
              {t("Login")}
            </Button>
          </Column>
        </form>
      </Box>
    </Page>
  );
};

export default LoginPage;
