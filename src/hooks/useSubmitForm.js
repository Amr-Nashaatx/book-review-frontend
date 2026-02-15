import { useAuthStore } from "../stores/authStore";
import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export const useSubmitForm = (fields, url, isEdit = false) => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    general: "",
  });

  const submitForm = async (formData) => {
    setFormErrors({
      general: "",
    });
    try {
      setIsLoading(true);
      const method = isEdit ? "put" : "post";
      const data = await sendRequest({ url, method, body: formData });

      if (data.user) {
        login(data.user);
      }
      setIsLoading(false);
      return true;
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
          return false;
        }
      } else {
        setFormErrors((prev) => ({
          ...prev,
          general: error.response.data.message,
        }));
        setIsLoading(false);
        return false;
      }
    }
  };
  return { isLoading, formErrors, submitForm };
};
