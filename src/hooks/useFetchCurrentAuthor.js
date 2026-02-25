import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchCurrentAuthor = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [author, setAuthor] = useState([]);

  const fetchCurrentAuthor = useCallback(async (params = { withCredentials: true }) => {
    await fetchData(
      () =>
        sendRequest({
          url: `/authors/me`,
          method: "get",
          params,
        }),
      (data) => {
        const { author } = data;
        setAuthor(author);
      },
    );
  }, [fetchData]);

  return { fetchCurrentAuthor, setAuthor, author, isLoading, error };
};
