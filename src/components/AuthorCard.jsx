import { Link } from "react-router-dom";

export default function AuthorCard({ author }) {
  const {
    penName,
    bio,
    avatar,
    isVerified,
    totalBooks = 0,
    averageRating = 0,
    _id,
  } = author;

  return (
    <article
      className="author-card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <header style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={
              avatar ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=" + penName
            }
            alt={penName}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--pico-primary-background)",
              marginBottom: "0.5rem",
            }}
          />
          {isVerified && (
            <span
              title="Verified Author"
              style={{
                position: "absolute",
                bottom: "10px",
                right: "0",
                background: "var(--pico-primary-background)",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--pico-card-background-color)",
              }}
            >
              ✓
            </span>
          )}
        </div>
        <hgroup>
          <h4 style={{ marginBottom: "0" }}>{penName}</h4>
          <p>
            <small>Author</small>
          </p>
        </hgroup>
      </header>

      <div style={{ flex: 1, padding: "0 1rem" }}>
        <p
          style={{
            fontSize: "0.9rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: "var(--pico-muted-color)",
          }}
        >
          {bio || "This author hasn't written a bio yet."}
        </p>
      </div>

      <div
        className="grid"
        style={{
          padding: "1rem",
          textAlign: "center",
          background: "var(--pico-card-sectioning-background-color)",
          marginTop: "1rem",
        }}
      >
        <div>
          <small style={{ display: "block", color: "var(--pico-muted-color)" }}>
            Books
          </small>
          <strong>{totalBooks}</strong>
        </div>
        <div>
          <small style={{ display: "block", color: "var(--pico-muted-color)" }}>
            Rating
          </small>
          <strong>
            {averageRating > 0 ? `⭐ ${averageRating.toFixed(1)}` : "N/A"}
          </strong>
        </div>
      </div>

      <footer style={{ padding: "1rem" }}>
        <Link
          to={`/authors/${_id}`}
          className="outline contrast"
          style={{ width: "100%", textAlign: "center", display: "block" }}
        >
          View Profile
        </Link>
      </footer>
    </article>
  );
}
