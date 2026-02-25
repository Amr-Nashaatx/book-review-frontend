import { useEffect, useRef } from "react";
import { renderStars } from "../utils/renderStars";
import { useFetchReviews } from "../hooks/useFetchReviews";
import Error from "./Error";

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

  const sectionStyle = {
    marginTop: "2rem",
  };

  const gridStyle = {
    display: "grid",
    gap: "1rem",
  };

  const cardStyle = {
    padding: "1rem",
    border: "1px solid rgba(0,0,0,0.15)",
    borderRadius: "0.5rem",
    background: "var(--pico-card-background-color, #fff)",
  };

  const headerStyle = {
    marginBottom: "0.5rem",
  };

  const nameStyle = {
    display: "block",
    fontSize: "1rem",
    fontWeight: "600",
  };

  const emailStyle = {
    color: "rgba(100,100,100,0.8)",
    fontSize: "0.85rem",
  };

  return (
    <section style={sectionStyle}>
      <h3>Reviews</h3>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      <div style={{ ...gridStyle }} ref={containerRef}>
        {reviews.map((review, i) => (
          <article key={i} style={cardStyle}>
            <header style={headerStyle}>
              <span style={nameStyle}>{review.user.name}</span>
              <small style={emailStyle}>{review.user.email}</small>
            </header>

            <p>
              <strong>{renderStars(review.rating)}</strong>
            </p>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: "1px" }} />
    </section>
  );
}
