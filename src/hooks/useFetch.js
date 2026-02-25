import { useCallback, useState } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async (requestFn, onSuccess) => {
    try {
      setIsLoading(true);
      setError("");
      const result = await requestFn();
      setIsLoading(false);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.message ? error.message : "Error fetching data!");
    }
  }, []);

  return { isLoading, error, fetchData };
};
