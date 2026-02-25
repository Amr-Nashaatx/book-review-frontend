import { useCallback, useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchShelves = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [shelves, setShelves] = useState([]);

  const fetchShelves = useCallback(async (params = { withCredentials: true }) => {
    await fetchData(
      () => sendRequest({ url: "/shelves", method: "get", params }),
      (data) => setShelves(data.shelves),
    );
  }, [fetchData]);

  return { fetchShelves, shelves, setShelves, isLoading, error };
};
