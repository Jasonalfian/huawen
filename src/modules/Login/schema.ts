import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("common.required")
    .max(255, "login.maximum_255_char"),
  password: yup
    .string()
    .required("common.required")
    .min(4, "login.minimum_four_char")
    .max(255, "login.maximum_255_char"),
});

export type LoginFormData = yup.InferType<typeof loginFormSchema>;

export const forgotFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("common.required")
    .max(255, "login.maximum_255_char"),
  token: yup.string().required("common.required"),
});

export type ForgotFormData = yup.InferType<typeof forgotFormSchema>;

export const resetFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("common.required")
    .min(4, "login.minimum_four_char")
    .max(255, "login.maximum_255_char"),
  token: yup.string().required("common.required").min(1, "common.required"),
});

export type ResetFormData = yup.InferType<typeof resetFormSchema>;
