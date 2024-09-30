import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username/email is required")
    .max(255, "Maximum 255 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Minimum 4 characters")
    .max(255, "Maximum 255 characters"),
});

export type LoginFormData = yup.InferType<typeof loginFormSchema>;

export const forgotFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(255, "Maximum 255 characters"),
  token: yup
    .string()
    .required("Token is needed"),
});

export type ForgotFormData = yup.InferType<typeof forgotFormSchema>;

export const resetFormSchema = yup.object().shape({
  password: yup
    .string()
    .required("Username is required")
    .min(4, "Password must be at least 4 characters")
    .max(255, "Maximum 255 characters"),
  token: yup
    .string()
    .required("Reset token is required")
    .min(1, "Token is needed"),
});

export type ResetFormData = yup.InferType<typeof resetFormSchema>;