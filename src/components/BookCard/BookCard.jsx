import { Link } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({ book, selectionMode, onAddBookToShelf }) {
  const CardContent = () => (
    <>
      {book.coverImage && (
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          className="book-card-image"
        />
      )}
      <div className="book-card-content">
        <header>
          <h3 className="book-card-title">{book.title}</h3>
          <small>by {book.author.penName}</small>
        </header>

        {selectionMode && (
          <div className="book-card-actions">
            <Link to={`/books/${book._id}`}>View</Link>
            <button
              className="primary"
              onClick={(e) => {
                e.preventDefault();
                onAddBookToShelf(book._id);
              }}
            >
              Add To Shelf
            </button>
          </div>
        )}
      </div>
    </>
  );

  if (selectionMode) {
    return (
      <div key={book._id} className="book-card">
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      key={book._id}
      to={`/books/${book._id}`}
      className="book-card"
      state={{ book }}
    >
      <CardContent />
    </Link>
  );
}
