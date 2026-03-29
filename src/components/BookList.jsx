import BookCard from "./BookCard/BookCard";
import { SimpleGrid } from "@mantine/core";

export default function BookList({ books, selectionMode, onAddBookToShelf }) {
  return (
    <SimpleGrid
      SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
      my={40}
    >
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          selectionMode={selectionMode}
          onAddBookToShelf={onAddBookToShelf}
        />
      ))}
    </SimpleGrid>
  );
}
