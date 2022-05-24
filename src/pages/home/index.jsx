import React from "react";
// Components
import { Button, InternalLink, Page, Row, RowBetween, Text } from "components";
import { AddIcon } from "components/svg";
// Context
import { useThemeContext, useTranslation } from "context";
// Store
import { useAppDispatch } from "store/store";
import { logout, MODAL_NAMES, showModal, useGetPokemonByNameQuery } from "store/reducers";

const HomePage = () => {
  const { toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // console.log(data, error, isLoading);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const openModalHandler = () => {
    dispatch(showModal(MODAL_NAMES.someModal));
  };

  return (
    <Page>
      <Text fontSize="32px" as="h1" fontStyle="bold">
        {t("Main page")}
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
      </RowBetween>
      <Row>
        <InternalLink to="/">{t("Link to Home page")}</InternalLink>
      </Row>
    </Page>
  );
};

export default HomePage;
