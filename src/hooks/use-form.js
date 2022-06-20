import { useFormik } from "formik";

const useForm = config => {
  const formik = useFormik({
    ...config,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
  });

  return {
    ...formik,
    fieldProps(field) {
      return {
        ...formik.getFieldProps(field),
        onChange: e => {
          return formik.setFieldValue(field, e.target.value);
        },
        onBlur: () => {
          formik.setFieldTouched(field, true, true);
        },
      };
    },
  };
};

export default useForm;
