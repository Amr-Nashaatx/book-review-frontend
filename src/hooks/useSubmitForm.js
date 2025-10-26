import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const useSubmitForm = (fields, url, navTo = "/") => {
  let errorFields = {};
  const navigate = useNavigate();
  for (let field of fields) {
    errorFields[field] = "";
  }
  const { setIsLoggedIn } = useContext(AuthContext);

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
      await axios.post(`${API_BASE_URL}${url}`, formData, {
        withCredentials: true,
      });
      setIsLoggedIn(true);
      navigate(navTo);
    } catch (error) {
      const responseData = error.response?.data;
      if (responseData?.errors) {
        const errors = responseData?.errors;
        if (errors) {
          const newErrors = {};
          for (let err of errors) {
            newErrors[err.path] = err.msg;
          }
          setFormErrors((prev) => ({ ...prev, ...newErrors }));
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          general: error.response.data.message,
        }));
      }
    }
  };
  return { formErrors, submitForm };
};
