import axios from "axios";
import { API_BASE_URL } from "../constants";

export const sendRequest = async (url, method = "get", params = {}) => {
  try {
    const reqOptions = {
      url: `${API_BASE_URL}${url}`,
      method,
      params,
      withCredentials: true,
    };
    const response = await axios.request(reqOptions);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
