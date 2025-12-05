import axios from "axios";
import { API_BASE_URL } from "../constants";

export const sendRequest = async ({
  url,
  method = "get",
  body = null,
  params = {},
}) => {
  try {
    const reqOptions = {
      url: `${API_BASE_URL}${url}`,
      method,
      params,
      withCredentials: true,
    };
    if (method === "post" || method === "put") {
      reqOptions.data = body;
    }
    const response = await axios.request(reqOptions);
    return response.data?.data ?? response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
