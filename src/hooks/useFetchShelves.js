import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchShelves = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [shelves, setShelves] = useState([]);

  async function fetchShelves(params = { withCredentials: true }) {
    await fetchData(
      () => sendRequest({ url: "/shelves", method: "get", params }),
      (data) => setShelves(data.shelves)
    );
  }

  return { fetchShelves, shelves, setShelves, isLoading, error };
};
