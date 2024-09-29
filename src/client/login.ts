import axios from "@/libs/axios";

type LoginPayload = {
  username: string;
  password: string;
};

export type LoginData = {
  username: string;
  name: string;
  role: string;
  profile_picture_url: string;
};

export type ForgotData = {
  username: string;
  token: string;
};

export type ResetData = {
  password: string;
  token: string;
};


export const postLogin = (data: LoginPayload) => {
  return axios({
    method: "post",
    url: `/account/login.php`,
    data,
  });
};

export const postForgot = (data: ForgotData) => {
  return axios({
    method: "post",
    url: `/account/forget_password.php`,
    data,
  });
};

export const postReset = (data: ResetData) => {
  return axios({
    method: "post",
    url: `/account/reset_password.php`,
    data,
  });
};

