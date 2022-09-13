import { useEffect, useState } from "react";

import { useTranslation } from "context";
import { Button, Heading, Page, Text, Box, Row } from "components";
import { EN, RU } from "configs/languages";
import { fetchLocale } from "./helpers";

export default {
  title: "Context/LanguageContext",
};

export const LanguageContext: React.FC = () => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [locale, setLocale] = useState({});

  useEffect(() => {
    getLocale(currentLanguage.locale);
  }, [currentLanguage.locale]);

  const getLocale = async (locale: string) => {
    const data = await fetchLocale(locale);
    if (data) {
      setLocale(data);
    }
  };

  const changeLanguageHandler = () => {
    const newLanguage = currentLanguage.code === "en" ? RU : EN;

    changeLanguage(newLanguage);
  };

  return (
    <Page>
      <Heading>
        {t("Current language is")} {currentLanguage.language}
      </Heading>
      <Button onClick={changeLanguageHandler}>{t("Change Language")}</Button>

      <Box my="12px">
        {Object.entries(locale).map(([key, value]) => (
          <>
            <Row key={key}>
              <Text color="black">{key}: </Text>
              <Text ml="10px">{value as string}</Text>
            </Row>
            <hr />
          </>
        ))}
      </Box>
    </Page>
  );
};
