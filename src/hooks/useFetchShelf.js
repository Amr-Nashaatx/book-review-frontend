import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export const useFetchShelf = () => {
  const [shelf, setShelf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchShelf(id) {
    try {
      setIsLoading(true);
      const { shelf } = await sendRequest(`/shelves/${id}`, "get");
      setIsLoading(false);
      setShelf(shelf);
    } catch (error) {
      console.error(error);
      setError(error.message ? error.message : "Error fetching shelves!");
    }
  }

  return { fetchShelf, shelf, isLoading, error };
};
