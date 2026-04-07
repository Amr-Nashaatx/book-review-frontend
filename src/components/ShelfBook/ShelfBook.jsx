import { Link } from "react-router-dom";
import "./ShelfBook.css";
import AnimatedListItem from "../AnimateListItem/AnimatedListItem";
import { Button, Card, Group, Loader, Stack, Text } from "@mantine/core";

export default function ShelfBook({
  book,
  handleRemoveBook,
  isRemoving,
  isCollapsing,
}) {
  return (
    <AnimatedListItem
      key={book._id}
      isRemoving={isRemoving}
      isCollapsing={isCollapsing}
      className="shelf-book"
    >
      <Card withBorder radius="md" p="md">
        <Group justify="space-between" align="center" wrap="wrap">
          <Stack gap={2}>
            <Text fw={700}>{book.title}</Text>
            <Text size="sm" c="dimmed">
              by {book.author.penName}
            </Text>
          </Stack>

          <Group gap="sm">
            <Button
              component={Link}
              to={`/books/${book._id}`}
              state={{ book }}
              variant="light"
              color="copper"
            >
              View
            </Button>

            <Button
              variant="light"
              color="red"
              onClick={() => handleRemoveBook(book._id)}
              disabled={isRemoving}
            >
              {isRemoving ? <Loader size="xs" color="red" /> : "Remove"}
            </Button>
          </Group>
        </Group>
      </Card>
    </AnimatedListItem>
  );
}
