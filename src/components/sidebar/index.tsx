import React from "react";
import { useTranslation } from "react-i18next";

import { FlexGap, Link } from "components";
import { IdealogicIcon } from "components/svg";

import { NAVIGATE_ITEMS } from "./constants";

import { StyledSidebarContainer } from "./styled";

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledSidebarContainer>
      <FlexGap flexDirection="column" justifyContent="center" gap="24px">
        <IdealogicIcon width="150px" />
        <FlexGap flexDirection="column" gap="16px" pl="16px">
          {NAVIGATE_ITEMS.map(({ title, path }, key) => (
            <Link href={path} key={key} textScale="body3">
              {`• ${t(title)}`}
            </Link>
          ))}
        </FlexGap>
      </FlexGap>
    </StyledSidebarContainer>
  );
};

export default Sidebar;
