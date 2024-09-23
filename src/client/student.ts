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
  age: string;
  created_at: string;
  education_job: string;
  gender: string;
  learning_chinese_since: number;
  phone_number: string;
  profile_picture_url: string;
  student_id: string;
  updated_at: string;
};

export const getLessons = () => {
  return axios({
    method: "post",
    url: `student/getLessons.php`,
  });
};

export const getLesson = (lessonId: string) => {
  return axios({
    method: "post",
    url: `student/getLessons.php?lesson_id=${lessonId}`,
  });
};

export const getAnnouncements = () => {
  return axios({
    method: "post",
    url: `student/getAnnouncements.php`,
  });
};

export const getMaterials = (lessonId: string) => {
  return axios({
    method: "post",
    url: `student/getMaterials.php?lesson_id=${lessonId}`,
  });
};

export const getProfile = () => {
  return axios({
    method: "post",
    url: `student/getProfile.php`,
  });
};
