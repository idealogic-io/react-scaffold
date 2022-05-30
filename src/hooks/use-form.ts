import { ChangeEvent } from "react";
import { useFormik, FormikConfig } from "formik";

const useForm = <Values>(config: FormikConfig<Values>) => {
  const formik = useFormik({
    ...config,
    validateOnBlur: false,
    // validateOnChange: false,
    validateOnMount: false,
  });

  return {
    ...formik,
    fieldProps(field: keyof Values) {
      return {
        ...formik.getFieldProps(field),
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          return formik.setFieldValue(field as string, e.target.value);
        },
      };
    },
  };
};

export default useForm;
