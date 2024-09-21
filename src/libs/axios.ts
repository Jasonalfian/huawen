import AxiosInstances from "axios";

const axios = AxiosInstances.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axios;
