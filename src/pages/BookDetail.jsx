import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import Button from "../components/Button";

export default function BookDetail() {
  const { id } = useParams();
  const { data: book, isLoading } = useFetchData(`/books/${id}`, "book");
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const isOwner = isLoggedIn && currentUser?._id === book.userId;
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        withCredentials: true,
      });
      navigate("/books");
    } catch (err) {
      console.error("Delete failed", err);
    }
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
            <Button to={`/books/${id}/edit`} variant="secondary">
              Edit
            </Button>

            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
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
