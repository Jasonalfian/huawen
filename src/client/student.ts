import axios from "@/libs/axios";

export type LessonData = {
  attendance: number;
  class_name: string;
  description: string;
  end_time: string;
  lesson_id: string;
  lesson_name: string;
  start_time: string;
  teachers: string;
  zoom_link: string;
  evaluation: string;
  task_type: string;
};

export type AnnouncementData = {
  created_at: string;
  message: string;
  title: string;
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

export type ProfileData = {
  created_at?: string | undefined;
  student_id?: string | undefined;
  updated_at?: string | undefined;
  profile_picture_url?: string | undefined;
  age: number;
  education_job: string;
  gender: string;
  learning_chinese_since: number;
  phone_number: string;
};

export type ProfilePayload = {
  gender: string;
  age: number;
  phone_number: string;
  learning_chinese_since: number;
  education_job: string;
};

export type TaskData = {
  class_name: string;
  created_at: string;
  deadline: string;
  description: string;
  file_url: string;
  instruction: string;
  lesson_id: string;
  lesson_name: string;
  meta: string;
  student_id: string;
  task_id: string;
  task_link: string;
  task_type: string;
  title: string;
  updated_at: string;
  visible: number;
};

export type SubmitTaskPayload = {
  file: File;
  description: string;
};

type Score = {
  aspect: string;
  score: string;
};

export type TaskScoreData = {
  feedback: {
    feedback_text: string;
    attachment_url: string;
  };
  score: Score[];
};

export const getLessons = () => {
  return axios({
    method: "get",
    url: `student/getLessons.php`,
  });
};

export const getLesson = (lessonId: string) => {
  return axios({
    method: "get",
    url: `student/getLessons.php?lesson_id=${lessonId}`,
  });
};

export const getAnnouncements = () => {
  return axios({
    method: "get",
    url: `student/getAnnouncements.php`,
  });
};

export const getMaterials = (lessonId: string) => {
  return axios({
    method: "get",
    url: `student/getMaterials.php?lesson_id=${lessonId}`,
  });
};

export const getProfile = () => {
  return axios({
    method: "get",
    url: `student/getProfile.php`,
  });
};

export const postProfile = (data: ProfilePayload) => {
  return axios({
    method: "post",
    url: `student/editProfile.php`,
    data,
  });
};

export const getTasks = (lessonId: string) => {
  return axios({
    method: "get",
    url: `student/getTasks.php?lesson_id=${lessonId}`,
  });
};

export const getTaskScore = (taskId: string) => {
  return axios({
    method: "get",
    url: `student/getResult.php?task_id=${taskId}`,
  });
};

export const submitTask = (data: FormData, taskId: string) => {
  return axios({
    method: "post",
    url: `/student/submitTask.php?task_id=${taskId}`,
    data,
  });
};

export const postDisplayPicture = (data: FormData) => {
  return axios({
    method: "post",
    url: `/student/uploadProfile.php`,
    data,
  });
};
