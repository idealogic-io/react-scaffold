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
import { InitialValues, useValidationSchema } from "./hooks";

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
      handleLogin(values);
    },
  });

  const handleLogin = async (formValues: InitialValues) => {
    const { email, password } = formValues;
    dispatch(loginUser({ email: email.toLowerCase(), password }));
  };

  const togglePasswordVisibleHandler = () => {
    setIsPassword(prev => !prev);
  };

  return (
    <Page>
      <Heading as="h2" scale="h2">
        {t("Login Page")}
      </Heading>
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
