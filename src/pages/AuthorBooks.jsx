import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BooksTable from "../components/BooksTable";
import { useFetchMyBooks } from "../hooks/useFetchMyBooks";
import { sendRequest } from "../utils/sendRequest";
import {
  Card,
  Group,
  Pagination,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { toast } from "react-toastify";

export default function AuthorBooks() {
  const location = useLocation();
  const [toastMsg, setToastMsg] = useState(location.state?.message || "");
  const { fetchMyBooks, myBooks, setMyBooks, pageInfo } = useFetchMyBooks();
  const [filters, setFilters] = useState({
    status: "all",
    sort: "lastModified",
    page: 1,
  });

  const handleDeleteBook = async (id) => {
    const snapshot = myBooks;
    try {
      setMyBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      await sendRequest({ url: `/books/${id}`, method: "delete" });
      toast.success("Book deleted successfully.");
    } catch (error) {
      console.error(error);
      setMyBooks(snapshot);
      toast.error("Failed to delete book.");
    }
  };

  const handleBookStatusUpdated = (updatedBook) => {
    setMyBooks((prevBooks) => {
      if (filters.status !== "all" && filters.status !== updatedBook.status) {
        return prevBooks.filter((book) => book._id !== updatedBook._id);
      }

      return prevBooks.map((book) =>
        book._id === updatedBook._id ? { ...book, ...updatedBook } : book,
      );
    });
  };

  useEffect(() => {
    const query = {
      ...filters,
      status: filters.status === "all" ? undefined : filters.status,
    };
    fetchMyBooks(query);
  }, [filters, fetchMyBooks]);

  useEffect(() => {
    if (!toastMsg) return;
    toast.success(toastMsg);
    setToastMsg("");
  }, [toastMsg]);

  const onStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };
  const onSortChange = (sort) => {
    setFilters((prev) => ({ ...prev, sort, page: 1 }));
  };
  const onPageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <Stack gap="lg">
      <Card p="xl">
        <Stack gap="lg">
          <div>
            <Title order={2} c="copper.6" fz={32}>
              My Books
            </Title>
            <Text c="dimmed" mt={6}>
              Manage your drafts and published works.
            </Text>
          </div>

          <Group align="flex-end" justify="space-between" gap="md" wrap="wrap">
            <Stack gap={8}>
              <Text size="sm" fw={600} c="copper.7">
                Status
              </Text>
              <SegmentedControl
                value={filters.status}
                onChange={onStatusChange}
                data={[
                  { label: "All", value: "all" },
                  { label: "Draft", value: "draft" },
                  { label: "Published", value: "published" },
                  { label: "Archived", value: "archived" },
                ]}
              />
            </Stack>

            <Select
              label="Sort by"
              value={filters.sort}
              onChange={(value) => value && onSortChange(value)}
              data={[
                { label: "Last Modified", value: "lastModified" },
                { label: "Title", value: "title" },
                { label: "Status", value: "status" },
              ]}
              allowDeselect={false}
              w={{ base: "100%", sm: 220 }}
            />
          </Group>

          {myBooks.length ? (
            <BooksTable
              booksData={myBooks}
              onDeleteBook={handleDeleteBook}
              onBookStatusUpdated={handleBookStatusUpdated}
            />
          ) : (
            <Text c="dimmed">No books found for the current filters.</Text>
          )}

          {pageInfo && pageInfo.totalPages > 1 && (
            <Group justify="center">
              <Pagination
                value={pageInfo.page}
                onChange={onPageChange}
                total={pageInfo.totalPages}
              />
            </Group>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
