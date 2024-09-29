import * as yup from "yup";

export const taskFormSchema = yup.object().shape({
  lesson_id: yup.string(),
  task_type: yup.string(),
  title: yup.string().required("field is required"),
  instruction: yup.string().required("field is required"),
  visible: yup.number(),
  deadline: yup.string().required("field is required"),
});

export type ProfileFormData = yup.InferType<typeof taskFormSchema>;
