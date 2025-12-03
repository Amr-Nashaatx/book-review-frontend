import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export const useFetchShelves = () => {
  const [shelves, setShelves] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchShelves(params = {}) {
    try {
      setIsLoading(true);
      const { shelves } = await sendRequest("/shelves", "get", params);
      setIsLoading(false);
      setShelves(shelves);
    } catch (error) {
      console.error(error);
      setError(error.message ? error.message : "Error fetching shelves!");
    }
  }

  return { fetchShelves, shelves, isLoading, error };
};
