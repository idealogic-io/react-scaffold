import React from "react";
import { useTranslation } from "react-i18next";

import { FlexGap, Link, Text, Column } from "components";

const UsefulLinks: React.FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "ProjectDescription" });

  return (
    <FlexGap gap="16px" flexDirection="column">
      <Text $fontWeight="bold">{t("usefulLinks")}</Text>
      <Column ml="32px">
        <Link href="https://www.rainbowkit.com/docs/introduction" external>
          - RainbowKit
        </Link>
        <Link href="https://wagmi.sh/react/getting-started" external>
          - Wagmi
        </Link>
        <Link href="https://viem.sh/docs/getting-started" external>
          - Viem
        </Link>
        <Link href="https://abitype.dev/" external>
          - Abitype
        </Link>
        <Link href="https://react.i18next.com/" external>
          - React-i18n
        </Link>
        <Link href="https://reactrouter.com/en/main" external>
          - React Router Dom
        </Link>
        <Link href="https://swr.vercel.app/" external>
          - Use SWR
        </Link>
      </Column>
    </FlexGap>
  );
};

export default UsefulLinks;
