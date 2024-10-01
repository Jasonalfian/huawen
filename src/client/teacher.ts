import axios from "@/libs/axios";

export type LessonData = {
  class_name: string;
  description: string;
  end_time: string;
  lesson_id: string;
  lesson_name: string;
  start_time: string;
  teachers: string;
  zoom_link: string;
  recording_link: string;
};

export type MaterialData = {
  created_at: string;
  description: string;
  lesson_id: string;
  link: string;
  material_id: string;
  meta: string;
  updated_at: string;
};

export type TaskData = {
  created_at: string;
  deadline: string;
  instruction: string;
  lesson_id: string;
  lesson_name: string;
  meta: string;
  task_id: string;
  task_link: string;
  task_type: string;
  title: string;
  updated_at: string;
  visible: number;
};

export type UploadFileData = {
  url: string;
  type: string;
};

export type SubmssionData = {
  feedback_attachment_url: string;
  feedback_created_at: string;
  feedback_text: string;
  feedback_updated_at: string;
  file_url: string;
  scores: Score[];
  student_id: string;
  student_name: string;
  submission_created_at: string;
  submission_description: string;
  submission_updated_at: string;
  task_id: string;
};

export type EditLessonPayload = {
  lesson_id: string;
  lesson_name: string;
  description: string;
  start_time: string;
  end_time: string;
  zoom_link?: string;
  recording_link?: string;
};

export type Score = {
  aspect: string;
  score: string;
};

type CreateMaterialPayload = {
  lesson_id: string;
  description: string;
  link: string;
};

type EditMaterialPayload = {
  description: string;
  link: string;
  meta: string;
};

export type TASK_TYPE = "HOMEWORK" | "EXAM";

export type CreateTaskPayload = {
  lesson_id: string;
  task_type: string;
  title: string;
  instruction: string;
  link: string;
  visible: number;
  deadline: string;
};

export type EditTaskPayload = {
  task_type: string;
  title: string;
  instruction: string;
  task_link: string;
  visible: number;
  deadline: string;
  meta: string;
};

export type GradeSubmissionPayload = {
  student_id: string;
  feedback_text: string;
  attachment_url: string;
  scores: Score[];
};

export type AttendanceData = {
  attendance: number;
  created_at: string;
  evaluation: string;
  lesson_id: string;
  name: string;
  profile_picture_url: string;
  student_id: string;
  updated_at: string;
  username: string;
};

export const getLessons = () => {
  return axios({
    method: "get",
    url: `teacher/getLessons.php`,
  });
};

export const getLessonStudents = (lessonId: string) => {
  return axios({
    method: "get",
    url: `teacher/getLessonStudents.php?lesson_id=${lessonId}`,
  });
};

export const getLessonMaterials = (lessonId: string) => {
  return axios({
    method: "get",
    url: `teacher/getMaterials.php?lesson_id=${lessonId}`,
  });
};

export const getTasks = (lessonId: string) => {
  return axios({
    method: "get",
    url: `teacher/getTasks.php?lesson_id=${lessonId}`,
  });
};

export const getSubmissions = (taskId: string) => {
  return axios({
    method: "get",
    url: `teacher/getSubmissions.php?task_id=${taskId}`,
  });
};

export const getLessonStudent = (lessonId: string) => {
  return axios({
    method: "get",
    url: `teacher/getLessonStudents.php?lesson_id=${lessonId}`,
  });
};

export const uploadFile = (data: FormData) => {
  return axios({
    method: "post",
    url: "teacher/uploadFile.php",
    data,
  });
};

export const createMaterial = (data: CreateMaterialPayload) => {
  return axios({
    method: "post",
    url: "teacher/createMaterial.php",
    data,
  });
};

export const createTask = (data: CreateTaskPayload) => {
  return axios({
    method: "post",
    url: "teacher/createTask.php",
    data,
  });
};

export const editMaterial = (data: EditMaterialPayload, materialId: string) => {
  return axios({
    method: "post",
    url: `teacher/editMaterial.php?material_id=${materialId}`,
    data,
  });
};

export const editTask = (data: EditTaskPayload, taskId: string) => {
  return axios({
    method: "post",
    url: `teacher/editTask.php?task_id=${taskId}`,
    data,
  });
};

export const editLessonInfo = (data: EditLessonPayload) => {
  return axios({
    method: "post",
    url: `/teacher/editLesson.php?lesson_id=${data.lesson_id}`,
    data,
  });
};

export const editLessonZoom = (lessonId: string, zoomLink = "") => {
  return axios({
    method: "post",
    url: `/teacher/editZoomLink.php?lesson_id=${lessonId}`,
    data: {
      zoom_link: zoomLink,
    },
  });
};

export const editLessonRecording = (lessonId: string, recordingLink = "") => {
  return axios({
    method: "post",
    url: `/teacher/editZoomRecording.php?lesson_id=${lessonId}`,
    data: {
      recording_link: recordingLink,
    },
  });
};

export const gradeSubmission = (
  taskId: string,
  data: GradeSubmissionPayload[]
) => {
  return axios({
    method: "post",
    url: `/teacher/gradeSubmission.php?task_id=${taskId}`,
    data,
  });
};
