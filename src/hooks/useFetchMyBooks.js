import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchMyBooks = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [myBooks, setMyBooks] = useState([]);

  async function fetchMyBooks(params = { withCredentials: true }) {
    await fetchData(
      () =>
        sendRequest({
          url: `/books/my-books`,
          method: "get",
          params,
        }),
      (data) => {
        const { books } = data;
        setMyBooks(books);
      }
    );
  }

  return { fetchMyBooks, setMyBooks, myBooks, isLoading, error };
};
