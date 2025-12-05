import { useState } from "react";
import { sendRequest } from "../utils/sendRequest";
import { useFetch } from "./useFetch";

export const useFetchReviews = () => {
  const { isLoading, error, fetchData } = useFetch();
  const [reviews, setReviews] = useState([]);
  const [pageInfo, setPageInfo] = useState();

  async function fetchReviews(bookId, params = {}) {
    await fetchData(
      () =>
        sendRequest({
          url: `/reviews/book/${bookId}/reviews?limit=6`,
          method: "get",
          params,
        }),
      (data) => {
        const { reviews, pageInfo } = data;
        if (params.after) {
          setReviews((prev) => [...prev, ...reviews]);
        } else {
          setReviews(reviews);
        }
        setPageInfo(pageInfo);
      }
    );
  }

  return { fetchReviews, reviews, pageInfo, isLoading, error };
};
