import * as yup from "yup";

export const profileFormSchema = yup.object().shape({
  name: yup.string(),
  age: yup.number().required("common.required"),
  education_job: yup
    .string()
    .required("common.required")
    .max(255, "login.maximum_255_char"),
  gender: yup.string().required("common.required"),
  learning_chinese_since: yup.number().required("common.required"),
  phone_number: yup.string().required("common.required"),
  created_at: yup.string(),
  student_id: yup.string(),
  updated_at: yup.string(),
  profile_picture_url: yup.string(),
});

export type ProfileFormData = yup.InferType<typeof profileFormSchema>;
