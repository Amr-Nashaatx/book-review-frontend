import { useEffect, useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export function useGenreOptions() {
  const [genreOptions, setGenreOptions] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await sendRequest({ url: "/books/genres" });
        setGenreOptions(res.genres || []);
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };

    fetchGenres();
  }, []);

  return genreOptions;
}
