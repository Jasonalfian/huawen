import * as yup from "yup";

export const taskFormSchema = yup.object().shape({
  lesson_id: yup.string(),
  task_type: yup.string(),
  title: yup.string().required("common.required"),
  instruction: yup.string().required("common.required"),
  visible: yup.number(),
  deadline: yup.string().required("common.required"),
});

export type ProfileFormData = yup.InferType<typeof taskFormSchema>;
