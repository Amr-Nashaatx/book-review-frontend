import { Link } from "react-router-dom";
import {
  Box,
  Card,
  Image,
  Text,
  Title,
  useComputedColorScheme,
  useMantineTheme,
} from "@mantine/core";

export default function PublishedBookCard({ book }) {
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme("light");
  const isDarkMode = colorScheme === "dark";

  const cardBackground = isDarkMode
    ? `linear-gradient(180deg, ${theme.colors.copper[9]} 0%, ${theme.colors.dark[6]} 100%)`
    : `linear-gradient(180deg, ${theme.colors.copper[0]} 0%, ${theme.colors.copper[1]} 100%)`;

  const fallbackBackground = isDarkMode
    ? `linear-gradient(135deg, ${theme.colors.dark[5]} 0%, ${theme.colors.copper[8]} 100%)`
    : `linear-gradient(135deg, ${theme.colors.copper[7]} 0%, ${theme.colors.copper[4]} 100%)`;

  const titleColor = isDarkMode ? theme.colors.copper[1] : theme.colors.copper[7];

  return (
    <Link
      key={book._id}
      to={`/books/${book._id}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
      state={{ book }}
    >
      <Card
        withBorder
        radius="lg"
        padding={0}
        style={{
          height: "100%",
          overflow: "hidden",
          background: cardBackground,
          transition:
            "background-color 180ms ease, color 180ms ease, border-color 180ms ease",
        }}
      >
        {book.coverImage ? (
          <Card.Section>
            <Image
              src={book.coverImage}
              h={260}
              alt={`Cover of ${book.title}`}
            />
          </Card.Section>
        ) : (
          <Box
            h={260}
            px="lg"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: fallbackBackground,
              textAlign: "center",
            }}
          >
            <Title order={3} c="white" lineClamp={4}>
              {book.title}
            </Title>
          </Box>
        )}

        <Box p="md">
          <Text fw={700} c={titleColor} lineClamp={2} ta="center">
            {book.title}
          </Text>
        </Box>
      </Card>
    </Link>
  );
}
