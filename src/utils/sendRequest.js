import axios from "axios";
import { API_BASE_URL } from "../constants";

const axiosInstance = axios.create({ withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest.url.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest);
      } catch (err) {
        window.dispatchEvent(new Event("auth:expired"));
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export const sendRequest = async ({
  url,
  method = "get",
  body = null,
  params = {},
  ...axiosConfig
}) => {
  try {
    const reqOptions = {
      url: `${API_BASE_URL}${url}`,
      method,
      params,
      withCredentials: true,
      ...axiosConfig,
    };
    if (method === "post" || method === "put") {
      reqOptions.data = body;
    }

    const response = await axiosInstance.request(reqOptions);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
