import { useFormik } from "formik";

const useForm = config => {
  const formik = useFormik({
    ...config,
    validateOnBlur: false,
    // validateOnChange: false,
    validateOnMount: false,
  });

  return {
    ...formik,
    fieldProps(field) {
      return {
        ...formik.getFieldProps(field),
        onChange: e => {
          return formik.setFieldValue(field, e.target.value);
        },
      };
    },
  };
};

export default useForm;
