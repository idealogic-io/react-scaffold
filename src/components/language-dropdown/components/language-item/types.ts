import { type Option } from "components/selects/types";

export type LanguageItemProps = {
  option: Option;
  onClick?: (option: Option) => void;
};
