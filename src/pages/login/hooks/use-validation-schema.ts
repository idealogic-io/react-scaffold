import * as yup from "yup";

import { useTranslation } from "context";
import { REGEX } from "configs";

const useValidationSchema = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required(t("This field is required")).email(t("Invalid email")),
    password: yup
      .string()
      .required("This field is required")
      .matches(
        REGEX.password,
        t("Must contain 8 characters, one uppercase, one lowercase, one number and one special case character"),
      ),
  });

  return { validationSchema, initialValues };
};

export default useValidationSchema;
