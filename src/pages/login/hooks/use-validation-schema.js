import * as yup from "yup";

import { useTranslation } from "context";

const useValidationSchema = () => {
  const { t } = useTranslation();

  const initialValues = {
    email: "testadmin1@gmail.com",
    password: "490223837aiia$A",
  };

  // TODO don't forget to use localize
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
      ),
  });

  return { validationSchema, initialValues };
};

export default useValidationSchema;
