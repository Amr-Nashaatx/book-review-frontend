import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchShelf = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [shelf, setShelf] = useState(null);

  const fetchShelf = useCallback(async (id) => {
    await fetchData(
      () => sendRequest({ url: `/shelves/${id}`, method: "get" }),
      (data) => setShelf(data.shelf),
    );
  }, [fetchData]);

  return { fetchShelf, shelf, setShelf, isLoading, error };
};
