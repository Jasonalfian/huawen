import * as yup from "yup";

export const lessonFormSchema = yup.object().shape({
  lesson_id: yup.string().required(),
  lesson_name: yup.string().required("field is required"),
  description: yup.string().required("field is required"),
  start_time: yup.string().required("field is required"),
  end_time: yup.string().required("field is required"),
  zoom_link: yup.string(),
  recording_link: yup.string(),
});

export type ProfileFormData = yup.InferType<typeof lessonFormSchema>;
