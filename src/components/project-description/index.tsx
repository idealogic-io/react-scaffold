import React from "react";
import { useTranslation } from "react-i18next";

import { FlexGap, Text } from "components";

const ProjectDescription: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ProjectDescription" });

  return (
    <FlexGap>
      <FlexGap gap="16px" flexDirection="column">
        <Text textAlign="justify">{t("article1")}</Text>
        <Text textAlign="justify">{t("article2")}</Text>
        <Text textAlign="justify">{t("article3")}</Text>
      </FlexGap>
    </FlexGap>
  );
};

export default ProjectDescription;
