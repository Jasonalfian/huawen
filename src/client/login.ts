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

export const postLogin = (data: LoginPayload) => {
  return axios({
    method: "post",
    url: `/account/login.php`,
    data,
  });
};
