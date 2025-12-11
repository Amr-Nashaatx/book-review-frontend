import BookCard from "./BookCard";

export default function BookList({ books, selectionMode, onAddBookToShelf }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "1rem",
        marginTop: "1.5rem",
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          selectionMode={selectionMode}
          onAddBookToShelf={onAddBookToShelf}
        />
      ))}
    </div>
  );
}
