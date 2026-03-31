import { useEffect, useRef } from "react";
import { useFetchReviews } from "../hooks/useFetchReviews";
import Error from "./Error";
import { Card, Rating, Stack, Text, Title, Group } from "@mantine/core";

const Review = ({ review }) => {
  return (
    <Card>
      <Group>
        <Stack gap={4}>
          <Text>{review.user.name}</Text>
          <Text size="sm" c={"dimmed"}>
            {review.user.email}
          </Text>
          <Rating value={review.rating} />
        </Stack>
      </Group>
      <Text mt={24}>{review.comment}</Text>
    </Card>
  );
};
export default function Reviews({ bookId }) {
  const { fetchReviews, error, isLoading, pageInfo, reviews } =
    useFetchReviews();

  const containerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    fetchReviews(bookId);
  }, [bookId, fetchReviews]);

  useEffect(() => {
    if (!pageInfo?.nextCursor) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading) {
        fetchReviews(bookId, { after: pageInfo.nextCursor });
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [bookId, fetchReviews, isLoading, pageInfo?.nextCursor]);

  if (error) return <Error message={error} />;

  return (
    <section>
      <Title order={3} c={"copper.6"} my={24}>
        Reviews
      </Title>

      {reviews.length === 0 && <Text>No reviews yet.</Text>}

      <Stack ref={containerRef}>
        {reviews.map((review, i) => (
          <Review review={review} key={review._id} />
        ))}
      </Stack>
      <div ref={loadMoreRef} style={{ height: "1px" }} />
    </section>
  );
}
