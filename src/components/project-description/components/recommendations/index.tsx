import React from "react";
import { useTranslation } from "react-i18next";

import { FlexGap, Text } from "components";

const Recommendations: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ProjectDescription" });

  return (
    <FlexGap gap="16px" flexDirection="column">
      <Text $fontWeight="bold">{t("recommendations")}</Text>
      <FlexGap gap="8px" flexDirection="column" ml="32px">
        <Text textAlign="justify">{t("recomm1")}</Text>
        <Text textAlign="justify">{t("recomm2")}</Text>
      </FlexGap>
    </FlexGap>
  );
};

export default Recommendations;
