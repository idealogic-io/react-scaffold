import React from "react";
import { useAppSelector } from "store/store";
import { useTranslation } from "react-i18next";

import { useLoginWithWallet } from "hooks";

import { Button, Text } from "components";

const SignInButton: React.FC = () => {
  const { token } = useAppSelector(state => state.auth);
  const { t } = useTranslation("translation", { keyPrefix: "SignInButton" });
  const { auth, isLoading: isAuthLoading } = useLoginWithWallet();

  if (!token) {
    return (
      <Button isLoading={isAuthLoading} onClick={auth}>
        {t("signIn")}
      </Button>
    );
  } else {
    return <Text textScale="body3">ScaffoldUser123</Text>;
  }
};

export default SignInButton;
