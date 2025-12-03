import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetchShelf } from "../hooks/useFetchShelf";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import Error from "../components/Error";
import BookList from "../components/BookList";
import Button from "../components/Button";
import { useState } from "react";

export default function ShelfDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { shelf, books, isLoading, error } = useFetchShelf(id);

  const [removingBookId, setRemovingBookId] = useState(null);

  if (isLoading) return <p>Loading shelf...</p>;
  if (error) return <Error message={error} />;
  if (!shelf) return <p>Not found.</p>;

  const handleRemoveBook = async (bookId) => {
    setRemovingBookId(bookId);
    try {
      await axios.delete(`${API_BASE_URL}/shelves/${id}/books/${bookId}`, {
        withCredentials: true,
      });

      setData((prev) => ({
        ...prev,
        books: prev.books.filter((b) => b.id !== bookId),
      }));
    } catch (err) {
      setError("Failed to remove book.");
    } finally {
      setRemovingBookId(null);
    }
  };

  const handleAddBooks = () => {
    navigate(`/books?addToShelf=${id}`);
  };

  return (
    <article style={{ padding: "2rem 4rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h2>{shelf.name}</h2>
        {shelf.description && (
          <p style={{ opacity: 0.8, marginTop: "0.5rem" }}>
            {shelf.description}
          </p>
        )}
        <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
          {books.length} book{books.length === 1 ? "" : "s"}
        </p>

        <Button variant="primary" onClick={handleAddBooks}>
          Add Books
        </Button>
      </header>

      <section>
        {books.length === 0 ? (
          <p>This shelf is empty.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {books.map((book) => (
              <article
                key={book.id}
                style={{
                  padding: "1rem",
                  border: "1px solid var(--pico-muted-border-color)",
                  borderRadius: "0.5rem",
                }}
              >
                <h3>{book.title}</h3>
                <p style={{ marginBottom: "0.5rem" }}>by {book.author}</p>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    to={`/books/${book.id}`}
                    className="secondary"
                    role="button"
                  >
                    View
                  </Link>

                  <button
                    className="danger"
                    disabled={removingBookId === book.id}
                    onClick={() => handleRemoveBook(book.id)}
                  >
                    {removingBookId === book.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {error && <Error message={error} />}
    </article>
  );
}
