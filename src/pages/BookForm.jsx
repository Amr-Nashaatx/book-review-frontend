import { useEffect, useState } from "react";
import { useSubmitForm } from "../hooks/useSubmitForm";
import { useGenreOptions } from "../hooks/useGenreOptions";
import Error from "../components/Error";
import { useNavigate, useParams } from "react-router-dom";
import { sendRequest } from "../utils/sendRequest";
import UploadField from "../components/UploadField";
import {
  Button,
  Card,
  Group,
  Image,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";

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
  const genreOptions = useGenreOptions();

  const { isLoading, submitForm, formErrors } = useSubmitForm(
    isEdit ? `/books/${id}` : "/books",
    isEdit, // if true, use PUT instead of POST
  );

  // Load existing book data if editing
  useEffect(() => {
    const fetchBook = async () => {
      if (!isEdit) return;
      try {
        const data = await sendRequest({ url: `/books/${id}` });
        setBook(data.book);
      } catch (err) {
        console.error("Failed to load book for editing:", err);
      }
    };
    fetchBook();
  }, [isEdit, id]);

  const genreData = genreOptions.map((genre) => ({
    label: genre,
    value: genre,
  }));

  if (book.genre && !genreData.some((option) => option.value === book.genre)) {
    genreData.unshift({ label: book.genre, value: book.genre });
  }

  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.type === "file")
      return setBook({ ...book, [e.target.name]: e.target.files?.[0] ?? "" });
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
    isEdit ? navigate(`/books/${id}`) : navigate(`/author/my-books`);
  };

  return (
    <article>
      <Card padding="xl">
        <Title c="copper.6" fz={32} ta="center">
          {isEdit ? "Edit Book" : "Add a New Book"}
        </Title>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Stack justify="center" w={{ base: "100%", md: "80%", lg: "60%" }}>
              <TextInput
                label="Title"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
                error={formErrors.title}
              />

              <Select
                label="Genre"
                value={book.genre}
                onChange={(value) =>
                  setBook((prev) => ({
                    ...prev,
                    genre: value ?? "",
                  }))
                }
                data={genreData}
                placeholder="Select a genre"
                searchable
                allowDeselect={false}
                required
                error={formErrors.genre}
              />

              <Textarea
                label="Description"
                name="description"
                value={book.description}
                onChange={handleChange}
                minRows={6}
                required
                error={formErrors.description}
              />

              <NumberInput
                label="Published Year"
                name="publishedYear"
                value={book.publishedYear}
                onChange={(value) =>
                  setBook((prev) => ({
                    ...prev,
                    publishedYear: value ?? "",
                  }))
                }
                allowDecimal={false}
                clampBehavior="none"
                required
                error={formErrors.publishedYear}
              />

              <UploadField
                title="Cover Image"
                name="cover"
                onChange={handleChange}
                error={formErrors.cover}
                description="Upload a clear cover image for your book."
              />

              {isEdit && book.coverImage && (
                <Card withBorder radius="md" padding="sm">
                  <Group align="flex-start" wrap="nowrap">
                    <Image
                      src={book.coverImage}
                      alt="book cover"
                      w={92}
                      h={132}
                      radius="sm"
                    />
                    <Stack gap={4}>
                      <Text fw={700} c="copper.6">
                        Current cover
                      </Text>
                      <Text size="sm" c="dimmed">
                        Upload a new image only if you want to replace the
                        existing cover.
                      </Text>
                    </Stack>
                  </Group>
                </Card>
              )}
            </Stack>

            {formErrors.general && <Error message={formErrors.general} />}

            <Button
              mt="lg"
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
            </Button>
          </div>
        </form>
      </Card>
    </article>
  );
}
