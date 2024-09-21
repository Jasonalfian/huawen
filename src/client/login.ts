import axios from "@/libs/axios";

type LoginPayload = {
  username: string;
  password: string;
};

export const postLogin = (data: LoginPayload) => {
  return axios({
    method: "post",
    url: `/account/login.php`,
    data,
  });
};
