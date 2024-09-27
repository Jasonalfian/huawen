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

export type uploadFileData = {
  url: string;
  type: string;
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

export const uploadFile = (data: FormData) => {
  return axios({
    method: "post",
    url: "teacher/uploadFile.php",
    data,
  });
};

type CreateMaterialPayload = {
  lesson_id: string;
  description: string;
  link: string;
};

export const createMaterial = (data: CreateMaterialPayload) => {
  return axios({
    method: "post",
    url: "teacher/createMaterial.php",
    data,
  });
};
