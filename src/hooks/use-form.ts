import { ChangeEvent } from "react";
import { useFormik, FormikConfig } from "formik";

const useForm = <Values>(config: FormikConfig<Values>) => {
  const formik = useFormik({
    ...config,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  return {
    ...formik,
    fieldProps(field: keyof Values) {
      return {
        ...formik.getFieldProps(field),
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          return formik.setFieldValue(field as string, e.target.value);
        },
        onBlur: () => {
          return formik.setFieldTouched(field as string, true, true);
        },
      };
    },
  };
};

export default useForm;
