import { Link } from "react-router-dom";

export default function BookCard({ book, selectionMode, onAddBookToShelf }) {
  if (selectionMode) {
    return (
      <div
        key={book._id}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          border: "1px solid var(--pico-muted-border-color)",
          borderRadius: "0.5rem",
          textDecoration: "none",
        }}
      >
        <header>
          <h3>{book.title}</h3>
          <small>by {book.author}</small>
        </header>
        <div
          className="actions"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            marginTop: "2rem",
          }}
        >
          <Link to={`/books/${book._id}`}>View</Link>
          <button
            className="primary"
            onClick={() => onAddBookToShelf(book._id)}
          >
            Add To Shelf
          </button>
        </div>
      </div>
    );
  }
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
      <header>
        <h3>{book.title}</h3>
        <small>by {book.author}</small>
      </header>
    </Link>
  );
}
