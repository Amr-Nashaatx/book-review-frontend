import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useBooksStore } from "../stores/booksStore";
import { renderStars } from "../utils/renderStars";
import Reviews from "../components/Review";

export default function BookDetail() {
  const { id } = useParams();
  const location = useLocation();
  const book =
    location.state?.book ||
    useBooksStore.getState().booksData.books.find((b) => b._id === id);

  const isLoading = useBooksStore((s) => s.isLoading);
  const deleteBook = useBooksStore((s) => s.deleteBook);

  const { isLoggedIn, currentUser } = useAuthStore();

  const isOwner = isLoggedIn && currentUser?.id === book.createdBy;

  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteBook();
    navigate("/books");
  };

  if (isLoading) return <p>Loading book...</p>;
  return (
    <article>
      <header style={{ padding: "2rem 4rem" }}>
        <h2>{book.title}</h2>
        <em>by {book.author}</em>
      </header>

      <dl style={{ padding: "2rem 4rem", marginTop: "1.2rem" }}>
        {book.genre && (
          <>
            <dt>Genre</dt>
            <dd>{book.genre}</dd>
          </>
        )}

        {book.publishedYear && (
          <>
            <dt>Published Year</dt>
            <dd>{book.publishedYear}</dd>
          </>
        )}
        {book.averageRating && (
          <>
            <dt>Rating</dt>
            <dd>{renderStars(book.averageRating)}</dd>
          </>
        )}
        <dt>Description</dt>
        <dd>{book.description}</dd>
      </dl>
      <footer style={{ marginTop: "2rem", padding: "2rem 4rem" }}>
        {isOwner && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <button to={`/books/${id}/edit`} variant="secondary">
              Edit
            </button>

            <button
              onClick={handleDelete}
              data-theme="secondary"
              style={{ backgroundColor: "red", borderColor: "red" }}
            >
              Delete
            </button>
          </div>
        )}

        <Reviews bookId={id} />
        <Link
          style={{ display: "inline-block", marginTop: "2rem" }}
          to="/books"
        >
          Back to Books
        </Link>
      </footer>
    </article>
  );
}
