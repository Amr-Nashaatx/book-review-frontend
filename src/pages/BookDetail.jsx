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
import UploadFieldWithProgress from "../components/UploadFieldWithProgress";
import { Grid, Image, Rating, Stack, Text, Title } from "@mantine/core";

const PLACEHOLDER_BOOK_COVER_URL =
  "https://placehold.co/500x500/f8dfcc/703c1c/png?text=No+Cover";

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
      setBook(cachedBook);
    }

    const shouldFetchBook =
      location.state?.fetchBook || (!location.state?.fetchBook && !cachedBook);
    if (shouldFetchBook) {
      fetchBookById(id);
    }
  }, [fetchBookById, id, location.state, setBook]);

  const deleteBook = useBooksStore((s) => s.deleteBook);

  //shelves
  const { fetchShelves, shelves } = useFetchShelves();

  const { isLoggedIn, currentUser } = useAuthStore();

  const isOwner = book
    ? isLoggedIn && currentUser?.authorId === book.authorId._id
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
  }, [fetchShelves]);

  if (isLoading) return <p>Loading book...</p>;
  const descriptionSection = ({ title, desc }) => {
    return (
      <>
        <Text component="dt" fw={"bold"}>
          {title}
        </Text>
        <Text component="dd" fw={"lighter"} pl={"xl"}>
          {desc}
        </Text>
      </>
    );
  };
  return (
    <article>
      {book ? (
        <>
          <header style={{ padding: "2rem 4rem" }}>
            <Title order={2} c={"copper.6"}>
              {book.title}
            </Title>
            <Text c={"dimmed"}>by {book.authorId.penName}</Text>
          </header>

          <Grid gutter={0}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Image
                h={500}
                w={300}
                src={book.coverImage || PLACEHOLDER_BOOK_COVER_URL}
                alt={book.title}
                radius={5}
                fallbackSrc={PLACEHOLDER_BOOK_COVER_URL}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack component={"dl"}>
                {book.genre && (
                  <>
                    {descriptionSection({
                      title: "Genre",
                      desc: `${book.genre}`,
                    })}
                  </>
                )}

                {book.publishedYear && (
                  <>
                    {descriptionSection({
                      title: "Published Year",
                      desc: `${book.publishedYear}`,
                    })}
                  </>
                )}
                {book.averageRating && (
                  <>
                    {descriptionSection({
                      title: "Rating",
                      desc: <Rating value={book.averageRating} />,
                    })}
                  </>
                )}
                <dt>Description</dt>
                <dd>{book.description}</dd>
              </Stack>
            </Grid.Col>
          </Grid>
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
            <UploadFieldWithProgress
              title="Update Cover Image"
              uploadHandler={handleCoverUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
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
