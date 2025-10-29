import { useEffect, useState } from "react";
import { useSubmitForm } from "../hooks/useSubmitForm";
import Error from "../components/Error";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default function BookForm({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedYear: 0,
  });

  const redirectPath = isEdit ? `/books/${id}` : "/books";

  const { isLoading, submitForm, formErrors } = useSubmitForm(
    ["title", "author", "genre", "description", "publishedYear"],
    isEdit ? `/books/${id}` : "/books",
    redirectPath,
    isEdit // if true, use PUT instead of POST
  );

  // Load existing book data if editing
  useEffect(() => {
    const fetchBook = async () => {
      if (!isEdit) return;
      try {
        const {
          data: { data },
        } = await axios.get(`${API_BASE_URL}/books/${id}`);
        setBook(data.book);
      } catch (err) {
        console.error("Failed to load book for editing:", err);
      }
    };
    fetchBook();
  }, [isEdit, id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitForm(book);
  };

  return (
    <article>
      <header>
        <h2>{isEdit ? "Edit Book" : "Add a New Book"}</h2>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.title && <Error message={formErrors.title} />}

        <label>
          Author
          <input
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.author && <Error message={formErrors.author} />}

        <label>
          Genre
          <input
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.genre && <Error message={formErrors.genre} />}

        <label>
          Description
          <textarea
            name="description"
            value={book.description}
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.description && <Error message={formErrors.description} />}

        <label>
          Published Year
          <input
            name="publishedYear"
            type="number"
            value={book.publishedYear}
            onChange={handleChange}
            required
          />
        </label>
        {formErrors.publishedYear && (
          <Error message={formErrors.publishedYear} />
        )}

        <button type="submit" disabled={isLoading}>
          {isEdit
            ? isLoading
              ? "Saving..."
              : "Save Changes"
            : isLoading
            ? "Adding..."
            : "Add Book"}
        </button>
      </form>
    </article>
  );
}
