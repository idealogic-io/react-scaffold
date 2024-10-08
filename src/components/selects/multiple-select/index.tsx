import React, { useState } from "react";

import { Button, Column } from "components";
import { ArrowDownIcon } from "components/svg";
import { Select } from "../select";
import { StyledButtonsWrapper } from "./styled";

import { useTooltip } from "hooks";

import { useThemeContext, useTranslation } from "context";
import { getTooltipStyles } from "../theme";

import { MultipleSelectProps, Option } from "../types";
import { TooltipOptions } from "hooks/use-tooltip/types";

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  titleProps,
  placeholder = "Please select...",
  placeholderProps = { color: "monochrome200" },
  dropdownComponent,
  dropdownWrapperProps,
  wrapperProps,
  iconProps,
  tooltipOptions,
  Icon = ArrowDownIcon,
  value = [],
  title = value
    .map(({ title }) => title)
    .sort()
    .join(", "),
  options,
  setValue,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(value);

  const { theme } = useThemeContext();
  const { t } = useTranslation();

  const DropdownComponent = dropdownComponent;

  const defaultTooltipOptions: TooltipOptions = {
    placement: "bottom",
    customStyles: getTooltipStyles(theme),
    trigger: "click",
  };

  const onSelectHandler = (option: Option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const onApplyCLick = () => {
    setVisible(false);
    setValue(selectedOptions);
  };

  const renderTooltip = () => {
    return (
      <Column>
        <DropdownComponent
          options={options}
          onClick={onDropdownMenuClick}
          isMultiple
          values={selectedOptions}
          {...dropdownWrapperProps}
        />

        <StyledButtonsWrapper>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedOptions(value);
              setVisible(false);
            }}
          >
            {t("Cancel")}
          </Button>

          <Button onClick={onApplyCLick}>{t("Apply")}</Button>
        </StyledButtonsWrapper>
      </Column>
    );
  };

  const { targetRef, tooltip, setVisible } = useTooltip(
    renderTooltip(),

    {
      ...defaultTooltipOptions,
      ...tooltipOptions,
    },
  );

  function onDropdownMenuClick(option: Option) {
    onSelectHandler(option);
  }

  return (
    <Select
      targetRef={targetRef}
      wrapperProps={wrapperProps}
      title={title}
      titleProps={titleProps}
      placeholder={placeholder}
      placeholderProps={placeholderProps}
      Icon={Icon}
      iconProps={iconProps}
      tooltip={tooltip}
    />
  );
};

export default MultipleSelect;
