import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { API_BASE_URL } from "../constants";
import { useState } from "react";

const sendRequest = async (url, formData, isEdit = false) => {
  const method = isEdit ? "put" : "post";
  let res;
  try {
    res = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
      data: formData,
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
  return res.data.data;
};

export const useSubmitForm = (fields, url, isEdit = false) => {
  const [isLoading, setIsLoading] = useState(false);

  let errorFields = {};
  for (let field of fields) {
    errorFields[field] = "";
  }
  const { login } = useAuthStore();

  const [formErrors, setFormErrors] = useState({
    general: "",
    ...fields,
  });

  const submitForm = async (formData) => {
    setFormErrors({
      general: "",
      ...fields,
    });
    try {
      setIsLoading(true);
      const data = await sendRequest(url, formData, isEdit);
      // if the request is for either signup or login, set user state.
      if (data.user) {
        login(data.user);
      }
      setIsLoading(false);
    } catch (error) {
      const responseData = error.response ? error.response.data : null;
      if (responseData?.errors) {
        const errors = responseData?.errors;
        if (errors) {
          const newErrors = {};
          for (let err of errors) {
            newErrors[err.path] = err.msg;
          }
          setFormErrors((prev) => ({ ...prev, ...newErrors }));
          setIsLoading(false);
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          general: error.response.data.message,
        }));
        setIsLoading(false);
      }
    }
  };
  return { isLoading, formErrors, submitForm };
};
