import axios from "axios";
import { API_BASE_URL } from "../constants";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("auth:expired"));
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
