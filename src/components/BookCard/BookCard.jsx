import { Link } from "react-router-dom";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Title,
  Stack,
} from "@mantine/core";
import "./BookCard.css";

function Demo() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
export default function BookCard({ book, selectionMode, onAddBookToShelf }) {
  const CardContent = () => (
    <>
      {book.coverImage && (
        <Card.Section>
          <Image
            src={book.coverImage}
            height={470}
            alt={`Cover of ${book.title}`}
          />
        </Card.Section>
      )}
      <div className="book-card-content">
        <Stack gap={2}>
          <Title order={3} c={"copper.6"}>
            {book.title}
          </Title>
          <Text c={"dimmed"}>by {book.authorId.penName}</Text>
        </Stack>

        {selectionMode && (
          <Group className="book-card-actions">
            <Button variant="outline">
              <Link to={`/books/${book._id}`}>View</Link>
            </Button>
            <Button
              className="primary"
              onClick={(e) => {
                e.preventDefault();
                onAddBookToShelf(book._id);
              }}
            >
              Add To Shelf
            </Button>
          </Group>
        )}
      </div>
    </>
  );

  if (selectionMode) {
    return (
      <Card
        key={book._id}
        className="book-card"
        withBorder
      >
        <CardContent />
      </Card>
    );
  }

  return (
    <Link
      key={book._id}
      to={`/books/${book._id}`}
      className="book-card"
      state={{ book }}
    >
      <Card
        withBorder
      >
        <CardContent />
      </Card>
    </Link>
  );
}

