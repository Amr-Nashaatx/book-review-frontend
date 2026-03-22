import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchChapters = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [chapters, setChapters] = useState([]);

  const fetchChapters = useCallback(
    async (bookId, params = { withCredentials: true }) => {
      let APIresult;
      await fetchData(
        () =>
          sendRequest({
            url: `/books/${bookId}/chapters`,
            method: "get",
            params,
          }),
        (data) => {
          const { chapters } = data;
          APIresult = chapters;
          setChapters(chapters);
        },
      );
      return APIresult;
    },
    [fetchData],
  );

  return { fetchChapters, setChapters, chapters, isLoading, error };
};
