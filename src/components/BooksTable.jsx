import BooksTableRow from "./BooksTableRow";
import { Table } from "@mantine/core";

export default function BooksTable({ booksData, onDeleteBook }) {
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Title</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th ta="center">Chapters</Table.Th>
          <Table.Th>Last Edited</Table.Th>
          <Table.Th ta="right">Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {booksData.map((book) => (
          <BooksTableRow
            key={book._id}
            bookData={book}
            onDeleteBook={onDeleteBook}
          />
        ))}
      </Table.Tbody>
    </Table>
  );
}
