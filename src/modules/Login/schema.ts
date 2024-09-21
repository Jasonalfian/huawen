import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .max(255, "Maximum 255 characters"),
  password: yup
    .string()
    .required("Password is required")
    .max(255, "Maximum 255 characters"),
});

export type LoginFormData = yup.InferType<typeof loginFormSchema>;
