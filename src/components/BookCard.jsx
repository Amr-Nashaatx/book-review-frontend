import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link
      key={book._id}
      to={`/books/${book._id}`}
      style={{
        display: "block",
        padding: "1rem",
        border: "1px solid var(--pico-muted-border-color)",
        borderRadius: "0.5rem",
        textDecoration: "none",
      }}
    >
      <h3>{book.title}</h3>
      <small>by {book.author}</small>
    </Link>
  );
}
