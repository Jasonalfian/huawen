export const STUDENT_URL = {
  HOME: "/student/home",
  PROFILE: "/student/profile",
  TASK: "/student/task",
  MATERIAL: "/student/material",
  CERTIFICATE: "/student/certificate",
  ANNOUNCEMENT: "/student/announcement",
};

export const TEACHER_URL = {
  HOME: "/teacher/home",
  MATERIAL: "/teacher/material",
  TASK: "/teacher/task",
  SUBMISSION: "/teacher/submission",
};

export const ACCEPT_FILE =
  "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpeg, image/png, image/gif, video/mp4, application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, audio/aac";

export const ROOT = "/";
export const ROLE_STUDENT = "STUDENT";
export const ROLE_TEACHER = "TEACHER";

export const MODAL_STYLE = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxWidth: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
