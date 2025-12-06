import { Link } from "react-router-dom";
import "./ShelfBook.css";
import AnimatedListItem from "../AnimateListItem/AnimatedListItem";

export default function ShelfBook({
  book,
  handleRemoveBook,
  isRemoving,
  isCollapsing,
}) {
  return (
    <AnimatedListItem
      key={book._id}
      isRemoving={isRemoving}
      isCollapsing={isCollapsing}
      className="shelf-book"
    >
      <div>
        <strong>{book.title}</strong>{" "}
        <span style={{ opacity: 0.7 }}>(by {book.author})</span>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Link
          to={`/books/${book._id}`}
          role="button"
          className="secondary"
          state={{ book }}
        >
          View
        </Link>

        <button
          className="danger"
          onClick={() => handleRemoveBook(book._id)}
          disabled={isRemoving}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
    </AnimatedListItem>
  );
}
