import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchBookById = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [book, setBook] = useState(null);

  const fetchBookById = useCallback(
    async (id, params = { withCredentials: true }) => {
    await fetchData(
      () =>
        sendRequest({
          url: `/books/${id}`,
          method: "get",
          params,
        }),
      (data) => {
        const { book } = data;
        setBook(book);
      },
    );
    },
    [fetchData],
  );

  return { fetchBookById, setBook, book, isLoading, error };
};
