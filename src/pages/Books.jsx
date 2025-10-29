import { useFetchData } from "../hooks/useFetchData";
import Error from "../components/Error";
import BookList from "../components/BookList";

export default function Books() {
  const { data: books, error, isLoading } = useFetchData("/books", "books");
  if (isLoading) return <p>Loading books...</p>;
  return (
    <article>
      <header>
        <h2>All Books</h2>
      </header>

      {!error ? (
        books.length === 0 ? (
          <p>No books yet.</p>
        ) : (
          <BookList books={books} />
        )
      ) : (
        <Error message={error} />
      )}
    </article>
  );
}
