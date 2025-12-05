import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchShelf = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [shelf, setShelf] = useState(null);

  async function fetchShelf(id) {
    await fetchData(
      () => sendRequest({ url: `/shelves/${id}`, method: "get" }),
      (data) => setShelf(data.shelf)
    );
  }

  return { fetchShelf, shelf, setShelf, isLoading, error };
};
