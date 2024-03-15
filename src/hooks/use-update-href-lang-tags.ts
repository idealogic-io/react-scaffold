import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { languageList } from "configs";
import { addLangHrefLink } from "utils";

export const useUpdateHrefLangTags = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    addLangHrefLink(languageList, pathname);
  }, [pathname]);
};
