import React from "react";
// Components
import { Button, InternalLink, Page, Row, RowBetween, Text } from "components";
import { AddIcon } from "components/svg";
// Context
import { useThemeContext, useTranslation } from "context";
// Store
import { useAppDispatch } from "store/store";
import { logout } from "store/reducers/auth";
import { MODAL_NAMES, showModal } from "store/reducers/modal";
import { RU, EN } from "configs/languages";

const HomePage = () => {
  const { toggleTheme } = useThemeContext();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const openModalHandler = () => {
    dispatch(showModal(MODAL_NAMES.someModal));
  };

  const changeLanguageHandler = () => {
    const newLanguage = currentLanguage.code === "en" ? RU : EN;

    changeLanguage(newLanguage);
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" bold>
        {t("Main Page")}
      </Text>
      <RowBetween py="12px">
        <Button as="a" href="https://google.com" external>
          {t("Redirect")}
        </Button>
        <Button onClick={toggleTheme} startIcon={<AddIcon />} endIcon={<AddIcon />}>
          {t("Toggle Theme")}
        </Button>
        <Button onClick={openModalHandler}>{t("Open Modal")}</Button>
        <Button onClick={logoutHandler}>{t("Logout")}</Button>
        <Button onClick={changeLanguageHandler}>{t("Change Language")}</Button>
      </RowBetween>
      <Row>
        <InternalLink to="/">{t("Link to Home page")}</InternalLink>
      </Row>
    </Page>
  );
};

export default HomePage;
