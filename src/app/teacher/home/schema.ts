import * as yup from "yup";

export const lessonFormSchema = yup.object().shape({
  lesson_id: yup.string().required("common.required"),
  lesson_name: yup.string().required("common.required"),
  description: yup.string().required("common.required"),
  start_time: yup.string().required("common.required"),
  end_time: yup.string().required("common.required"),
  zoom_link: yup.string(),
  recording_link: yup.string().notRequired(),
});

export type ProfileFormData = yup.InferType<typeof lessonFormSchema>;
