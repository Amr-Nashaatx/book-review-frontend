import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useBooksStore } from "../stores/booksStore";
import { renderStars } from "../utils/renderStars";
import Reviews from "../components/Review";
import { useFetchShelves } from "../hooks/useFetchShelves";
import { useEffect, useState } from "react";
import AddToShelfDropdown from "../components/AddToShelfDropdown/AddToShelfDropdown";
import { sendRequest } from "../utils/sendRequest";
import { useFetchBookById } from "../hooks/useFetchBookById";

export default function BookDetail() {
  const { id } = useParams();
  const location = useLocation();
  const { fetchBookById, book, setBook, isLoading } = useFetchBookById();
  // progress bar state for cover upload
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  // find book either in route state or in books store previously fetched.
  useEffect(() => {
    const cachedBook =
      location.state?.book ||
      useBooksStore.getState().booksData.books.find((b) => b._id === id);

    if (cachedBook) {
      console.log("found book cached", cachedBook);
      setBook(cachedBook);
    }

    // if fetch flag is set in route state, fetch the book from server
    if (location.state?.fetchBook) {
      fetchBookById(id);
    }
  }, [id, location.state]); // eslint-disable-line react-hooks/exhaustive-deps

  const deleteBook = useBooksStore((s) => s.deleteBook);

  //shelves
  const { fetchShelves, shelves } = useFetchShelves();

  const { isLoggedIn, currentUser } = useAuthStore();

  const isOwner = book
    ? isLoggedIn && currentUser?.id === book.createdBy
    : false;

  const navigate = useNavigate();
  const handleDelete = async () => {
    await deleteBook(id);
    navigate("/books");
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cover", file);

    try {
      setIsUploading(true);
      await sendRequest({
        url: `/books/${id}/cover`,
        method: "post",
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      setIsUploading(false);
      navigate(`/books/${id}`, {
        state: {
          fetchBook: true,
        },
      });
    } catch (error) {
      console.error("Failed to upload cover", error);
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchShelves({ withCredentials: true });
  }, []);

  if (isLoading) return <p>Loading book...</p>;
  return (
    <article>
      {book ? (
        <>
          <header style={{ padding: "2rem 4rem" }}>
            <h2>{book.title}</h2>
            <em>by {book.author}</em>
          </header>

          <div
            className="book-data"
            style={{
              display: "flex",
              gap: "1rem",
              padding: "2rem 4rem",
              marginTop: "1.2rem",
            }}
          >
            <img
              style={{ width: "500px", height: "500px", objectFit: "contain" }}
              src={book.coverImage}
              alt={book.title}
            />
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
          </div>
        </>
      ) : (
        "loading book..."
      )}

      <footer style={{ marginTop: "2rem", padding: "2rem 4rem" }}>
        <AddToShelfDropdown shelves={shelves} book={book} />
        {isOwner && (
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                to={`/books/${id}/edit`}
                role="button"
                className="secondary"
              >
                Edit
              </Link>

              <button
                onClick={handleDelete}
                data-theme="secondary"
                style={{ backgroundColor: "red", borderColor: "red" }}
              >
                Delete
              </button>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <label htmlFor="cover-upload">Update Cover Image</label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                disabled={isUploading}
              />
              {isUploading && <progress value={uploadProgress} max="100" />}
            </div>
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
