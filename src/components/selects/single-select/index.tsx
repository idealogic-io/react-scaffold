import React from "react";

import { ArrowDownIcon } from "components/svg";
import { Select } from "../select";

import { useTooltip } from "hooks";

import { useThemeContext } from "context";
import { getTooltipStyles } from "../theme";

import { Option, SingleSelectProps } from "../types";
import { TooltipOptions } from "hooks/use-tooltip/types";

const SingleSelect: React.FC<SingleSelectProps> = ({
  title,
  titleProps,
  placeholder = "Please select...",
  placeholderProps = { color: "monochrome200" },
  dropdownComponent,
  dropdownWrapperProps,
  wrapperProps,
  iconProps,
  tooltipOptions,
  Icon = ArrowDownIcon,
  value,
  options,
  setValue,
}) => {
  const { theme } = useThemeContext();

  const DropdownComponent = dropdownComponent;

  const defaultTooltipOptions: TooltipOptions = {
    placement: "bottom",
    customStyles: getTooltipStyles(theme),
    trigger: "click",
  };

  const { targetRef, tooltip, setVisible } = useTooltip(
    <DropdownComponent options={options} value={value} onClick={onDropdownMenuClick} {...dropdownWrapperProps} />,

    {
      ...defaultTooltipOptions,
      ...tooltipOptions,
    },
  );

  function onDropdownMenuClick(option: Option) {
    setVisible(false);
    setValue(option);
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

export default SingleSelect;
