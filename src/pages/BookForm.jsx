import { useEffect, useState } from "react";
import { useSubmitForm } from "../hooks/useSubmitForm";
import Error from "../components/Error";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import UploadField from "../components/UploadField";

export default function BookForm({ mode = "create" }) {
  const { id } = useParams();
  const isEdit = mode === "edit";

  const [book, setBook] = useState({
    title: "",
    genre: "",
    description: "",
    cover: "",
    publishedYear: 0,
  });

  const { isLoading, submitForm, formErrors } = useSubmitForm(
    isEdit ? `/books/${id}` : "/books",
    isEdit, // if true, use PUT instead of POST
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

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.type === "file")
      return setBook({ ...book, [e.target.name]: e.target.files[0] });
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const field in book) {
      if (field === "cover" && !(book[field] instanceof File)) continue; // only append cover if it is a file
      formData.append(field, book[field]);
    }
    const ok = await submitForm(formData);
    if (!ok) return;
    isEdit ? navigate(`/books/${id}`, { state: { book } }) : navigate("/books");
  };

  return (
    <article>
      <header style={{ padding: "2rem 5rem" }}>
        <h2>{isEdit ? "Edit Book" : "Add a New Book"}</h2>
      </header>

      <form onSubmit={handleSubmit} style={{ padding: "2rem 4rem" }}>
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
            contentEditable={false}
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
        {isEdit && book.coverImage && (
          <img src={book.coverImage} alt="book cover" width="80" height="80" />
        )}
        <UploadField title="Cover Image" name="cover" onChange={handleChange} />
        <button
          type="submit"
          disabled={
            isLoading ||
            book.status === "preview" ||
            book.status === "published"
          }
        >
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
