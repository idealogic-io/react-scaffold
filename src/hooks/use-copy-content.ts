import { toast } from "react-toastify";

import { toastOptionsError, toastOptionsSuccess } from "components";
import { useTranslation } from "context";

const useCopyContent = () => {
  const { t } = useTranslation();

  const copyContentHandler = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("Copied"), toastOptionsSuccess);
    } catch {
      toast.error(t("Fail to copy"), toastOptionsError);
    }
  };

  return { copyContentHandler };
};

export default useCopyContent;
