import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";

export const useFetchReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchReviews(bookId, params = {}) {
    try {
      setIsLoading(true);
      const { reviews, pageInfo } = await sendRequest(
        `/reviews/book/${bookId}/reviews?limit=6`,
        "get",
        params
      );
      setIsLoading(false);
      if (params.after) {
        setReviews((prev) => [...prev, ...reviews]);
      } else {
        setReviews(reviews);
      }
      setPageInfo(pageInfo);
    } catch (error) {
      console.error(error);
      setError(error.message ? error.message : "Error fetching reviews!");
    }
  }

  return { fetchReviews, reviews, pageInfo, isLoading, error };
};
