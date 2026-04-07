import { Edit3, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { sendRequest } from "../utils/sendRequest";
import { ActionIcon, Badge, Group, Table, Text } from "@mantine/core";

export default function BooksTableRow({ bookData, onDeleteBook }) {
  const handlePreviewBook = async (bookId) => {
    const pdf = await sendRequest({
      url: `/books/${bookId}/preview`,
      method: "get",
      responseType: "blob",
    });
    const url = URL.createObjectURL(pdf);
    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 10000);
  };
  return (
    <Table.Tr>
      <Table.Td>
        <strong>{bookData.title}</strong>
      </Table.Td>
      <Table.Td>
        <Badge color="copper" variant="light">
          {bookData.status}
        </Badge>
      </Table.Td>
      <Table.Td ta="center">{bookData.chapters.length + 1}</Table.Td>
      <Table.Td>
        <Text size="sm">{new Date(bookData.updatedAt).toLocaleDateString()}</Text>
      </Table.Td>
      <Table.Td ta="right">
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            title="View Book"
            onClick={() => handlePreviewBook(bookData._id)}
          >
            <Eye size={16} strokeWidth={2.5} />
          </ActionIcon>

          <ActionIcon
            component={Link}
            to={`/books/${bookData._id}/chapters`}
            variant="subtle"
            color="copper"
            title="Edit Chapters"
          >
            <Edit3 size={16} strokeWidth={2.5} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            color="red"
            title="Delete Draft"
            onClick={() => onDeleteBook(bookData._id)}
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
}
