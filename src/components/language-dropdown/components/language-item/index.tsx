import React from "react";

import { FlexGap, Image, Text } from "components";

import { languages } from "configs";

import { type LanguageItemProps } from "./types";

const LanguageItem: React.FC<LanguageItemProps> = ({ option, onClick }) => {
  const language = languages[option.value];

  return (
    <FlexGap gap="8px" alignItems="center" onClick={onClick ? () => onClick(option) : undefined}>
      <Image src={language.flagUrl} aspectRatio={2} width="24px" />
      <Text textScale="caption1">{language.language}</Text>
    </FlexGap>
  );
};

export default LanguageItem;
