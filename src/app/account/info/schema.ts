import * as yup from "yup";

export const profileFormSchema = yup.object().shape({
  age: yup.number().required("Field is required"),
  education_job: yup
    .string()
    .required("Field is required")
    .max(255, "Maximum 255 characters"),
  gender: yup.string().required("Field is required"),
  learning_chinese_since: yup.number().required("Field is required"),
  phone_number: yup.string().required("Field is required"),
  created_at: yup.string(),
  student_id: yup.string(),
  updated_at: yup.string(),
  profile_picture_url: yup.string(),
});

export type ProfileFormData = yup.InferType<typeof profileFormSchema>;
