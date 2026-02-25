import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchMyBooks = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [myBooks, setMyBooks] = useState([]);
  const [pageInfo, setPageInfo] = useState();

  const fetchMyBooks = useCallback(async (params = { withCredentials: true }) => {
    await fetchData(
      () =>
        sendRequest({
          url: `/books/my-books`,
          method: "get",
          params,
        }),
      (data) => {
        const { books, pageInfo } = data;
        setMyBooks(books);
        setPageInfo(pageInfo);
      },
    );
  }, [fetchData]);

  return { fetchMyBooks, setMyBooks, pageInfo, myBooks, isLoading, error };
};
