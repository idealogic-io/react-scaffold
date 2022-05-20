import React from "react";
// Components
import { Button, Page, Text } from "components";
import { AddIcon } from "components/svg";
// Theme
import { fontsStyles } from "theme/base";

import { useThemeContext } from "context";

const HomePage = () => {
  const { toggleTheme } = useThemeContext();
  return (
    <Page>
      <Text fSize="title1" as="h1" fStyle={fontsStyles.mv.bold}>
        Main page
      </Text>
      <Button as="a" href="https://google.com" external>
        Click me
      </Button>
      <Button onClick={toggleTheme} startIcon={<AddIcon color="failure" />} endIcon={<AddIcon color="failure" />}>
        Toggle Theme
      </Button>
    </Page>
  );
};

export default HomePage;
