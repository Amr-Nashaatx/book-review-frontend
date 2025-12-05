import { useParams, useNavigate } from "react-router-dom";
import { useFetchShelf } from "../hooks/useFetchShelf";
import Error from "../components/Error";
import { useState, useEffect } from "react";
import ShelfBook from "../components/ShelfBook/ShelfBook";
import { sendRequest } from "../utils/sendRequest";
import Toast from "../components/Toast/Toast";
import { useListAnimation } from "../hooks/useListAnimation";

export default function ShelfDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchShelf, shelf, setShelf, isLoading } = useFetchShelf();
  const [toastMessage, setToastMessage] = useState("");

  const [actionError, setActionError] = useState("");
  const {
    removingId: removingBookId,
    collapsingId: collapsingBookId,
    handleRemove: animateRemoveBook,
  } = useListAnimation();

  useEffect(() => {
    if (id) fetchShelf(id);
  }, [id]);

  const handleRemoveBook = async (bookId) => {
    const prevShelf = shelf;
    try {
      await animateRemoveBook(bookId, async () => {
        setShelf({
          ...shelf,
          books: shelf.books.filter((b) => b._id !== bookId),
        });
        setActionError("");
        await sendRequest({
          url: `/shelves/${id}/books/${bookId}`,
          method: "delete",
          params: {
            withCredentials: true,
          },
        });
        setToastMessage("Removed book from shelf.");
      });
    } catch (err) {
      console.log(err);
      setShelf(prevShelf);
      setActionError("Failed to remove book.");
    }
  };

  if (isLoading) return <p>Loading shelf...</p>;
  if (!shelf) return <p>Shelf not found.</p>;

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
          {shelf.books.length} book{shelf.books.length === 1 ? "" : "s"}
        </p>

        <button onClick={handleAddBooks}>Add Books</button>
      </header>

      <section>
        {shelf.books.length === 0 ? (
          <p>This shelf is empty.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {shelf.books.map((book) => (
              <ShelfBook
                key={book._id}
                book={book}
                handleRemoveBook={handleRemoveBook}
                isRemoving={removingBookId === book._id}
                isCollapsing={collapsingBookId === book._id}
              />
            ))}
          </ul>
        )}
      </section>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      {actionError && <Error message={actionError} />}
    </article>
  );
}
