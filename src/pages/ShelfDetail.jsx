import { useParams, useNavigate } from "react-router-dom";
import { useFetchShelf } from "../hooks/useFetchShelf";
import Error from "../components/Error";
import { useState, useEffect } from "react";
import ShelfBook from "../components/ShelfBook/ShelfBook";
import { sendRequest } from "../utils/sendRequest";
import { useListAnimation } from "../hooks/useListAnimation";
import {
  Button,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BookOpen, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function ShelfDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchShelf, shelf, setShelf, isLoading, error } = useFetchShelf();
  const [actionError, setActionError] = useState("");
  const {
    removingId: removingBookId,
    collapsingId: collapsingBookId,
    handleRemove: animateRemoveBook,
  } = useListAnimation();

  useEffect(() => {
    if (id) fetchShelf(id);
  }, [fetchShelf, id]);

  const handleRemoveBook = async (bookId) => {
    const prevShelf = shelf;
    try {
      await animateRemoveBook(bookId, async () => {
        setShelf({
          ...prevShelf,
          books: prevShelf.books.filter((b) => b._id !== bookId),
        });
        await sendRequest({
          url: `/shelves/${id}/books/${bookId}`,
          method: "delete",
          params: {
            withCredentials: true,
          },
        });
        toast.success("Removed book from shelf.");
      });
    } catch (err) {
      console.log(err);
      setShelf(prevShelf);
      setActionError("Failed to remove book.");
    }
  };

  const handleAddBooks = () => {
    navigate(`/books?addToShelf=${id}`);
  };

  if (isLoading) {
    return (
      <Card p="xl">
        <Group justify="center" py="xl">
          <Loader color="copper.6" />
          <Text c="dimmed">Loading shelf...</Text>
        </Group>
      </Card>
    );
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!shelf) {
    return (
      <Card p="xl">
        <Text c="dimmed">Shelf not found.</Text>
      </Card>
    );
  }

  return (
    <Stack gap="lg">
      <Card p="xl">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <div>
              <Title order={2} c="copper.6" fz={32}>
                {shelf.name}
              </Title>
              {shelf.description && (
                <Text c="dimmed" mt={6}>
                  {shelf.description}
                </Text>
              )}
              <Text size="sm" c="dimmed" mt={10}>
                {shelf.books.length} book{shelf.books.length === 1 ? "" : "s"}
              </Text>
            </div>

            <Button leftSection={<Plus size={16} />} onClick={handleAddBooks}>
              Add Books
            </Button>
          </Group>

          {shelf.books.length === 0 ? (
            <Card withBorder radius="md" p="xl">
              <Stack align="center" gap="xs">
                <BookOpen size={28} />
                <Text fw={600}>This shelf is empty.</Text>
                <Text size="sm" c="dimmed" ta="center">
                  Add books to start building this collection.
                </Text>
              </Stack>
            </Card>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {shelf.books.map((book) => {
                return (
                  <ShelfBook
                    key={book._id}
                    book={book}
                    handleRemoveBook={handleRemoveBook}
                    isRemoving={removingBookId === book._id}
                    isCollapsing={collapsingBookId === book._id}
                  />
                );
              })}
            </ul>
          )}
        </Stack>
      </Card>

      {actionError && <Error message={actionError} />}
    </Stack>
  );
}
