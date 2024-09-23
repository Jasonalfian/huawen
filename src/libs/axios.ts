import AxiosInstances from "axios";
import useGlobalStore from "./global";

const axiosInstance = AxiosInstances.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to attach the token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = useGlobalStore.getState().token; // Assuming you store the token in Zustand

    if (token) {
      config.headers["Token"] = `${token}`; // or use your custom header
      // For custom token header:
      // config.headers['token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Return the response if it's successful
    return response;
  },
  (error) => {
    // Check if the error response status is 401
    if (error.response && error.response.status === 401) {
      const logout = useGlobalStore.getState().logout;
      logout();
    }
    // Return the error so it's handled properly in the component
    return Promise.reject(error);
  }
);

export default axiosInstance;
