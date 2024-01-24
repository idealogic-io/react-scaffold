import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { SingleSelect } from "components";
import { LanguageItem, LanguageMenu } from "./components";

import { languages, type LanguageCode } from "configs";

import { type Option } from "components/selects/types";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const selectedLanguageCode = i18n.resolvedLanguage as LanguageCode;
  const [selectedLanguage, setSelectedLanguage] = useState<Option>({
    value: selectedLanguageCode,
    title: languages[selectedLanguageCode].language,
  });

  const options = Object.entries(languages).map(language => {
    return {
      value: language[0],
      title: language[1].language,
    };
  });

  const setLanguage = (languageCode: Option) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode.value.toString());
  };

  if (!i18n.resolvedLanguage) {
    return null;
  }

  return (
    <SingleSelect
      title={<LanguageItem option={selectedLanguage} />}
      setValue={setLanguage}
      dropdownComponent={LanguageMenu}
      options={options}
      value={selectedLanguage}
      dropdownWrapperProps={{}}
    />
  );
};

export default LanguageDropdown;
