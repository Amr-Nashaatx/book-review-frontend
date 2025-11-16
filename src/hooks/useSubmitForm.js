import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";

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

export const useSubmitForm = (fields, url, navTo = "/", isEdit = false) => {
  const [isLoading, setIsLoading] = useState(false);

  let errorFields = {};
  const navigate = useNavigate();
  for (let field of fields) {
    errorFields[field] = "";
  }
  const { setIsLoggedIn, setCurrentUser } = useContext(AuthContext);

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
        setIsLoggedIn(true);
        setCurrentUser(data.user);
      }
      setIsLoading(false);
      navigate(navTo);
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
