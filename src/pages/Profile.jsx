import { useEffect, useState } from "react";
import { useFetchShelves } from "../hooks/useFetchShelves";
import { useListAnimation } from "../hooks/useListAnimation";
import { useAuthStore } from "../stores/authStore";
import NewShelfModal from "../components/NewShelfModal";
import { sendRequest } from "../utils/sendRequest";
import { Navigate, useNavigate } from "react-router-dom";
import Shelf from "../components/Shelf/Shelf";

import { useFetchMyBooks } from "../hooks/useFetchMyBooks";
import { useFetchCurrentAuthor } from "../hooks/useFetchCurrentAuthor.js";
import EditableField from "../components/EditableField";
import {
  Text,
  Title,
  Group,
  Stack,
  SimpleGrid,
  Card,
  Button,
  Grid,
} from "@mantine/core";

import { toast } from "react-toastify";
import { useBooksStore } from "../stores/booksStore.js";
import PublishedBookCard from "../components/PublishedBookCard.jsx";

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  minHeight: "40px",
};

export default function Profile() {
  const [isNewShelfModalOpen, setIsNewShelfModalOpen] = useState(false);

  const { fetchShelves, shelves, setShelves } = useFetchShelves();
  const books = useBooksStore((s) => s.booksData.books);
  const { fetchMyBooks, myBooks } = useFetchMyBooks();
  const { currentUser, isLoggedIn, setCurrentUser } = useAuthStore();
  const { fetchCurrentAuthor, author } = useFetchCurrentAuthor();

  const navigate = useNavigate();
  const {
    removingId: shelfRemovingId,
    collapsingId: shelfCollapsingId,
    handleRemove: animateRemoveShelf,
  } = useListAnimation();

  const handleCreateShelf = async ({ name, description }) => {
    try {
      const { shelf } = await sendRequest({
        url: "/shelves",
        method: "post",
        body: { name, description },
        params: { withCredentials: true },
      });
      toast.success("Shelf created successfully.");
      setIsNewShelfModalOpen(false);
      navigate(`/shelves/${shelf._id}`);
    } catch (error) {
      console.error("Failed to create shelf.", error);
      toast.error("Failed to create shelf.");
    }
  };

  const updateField = async (fieldName, newValue) => {
    try {
      const { user: newUser } = await sendRequest({
        url: `/users/${currentUser.id}`,
        method: "put",
        body: { [fieldName]: newValue },
      });
      setCurrentUser(newUser);
      toast.success(`${fieldName} updated successfully.`);
    } catch (error) {
      console.error("Failed to update user field.", error);
      toast.error("Failed to update.");
    }
  };
  const handleRemoveShelf = async (shelfId) => {
    const previousShelves = [...shelves];
    try {
      await animateRemoveShelf(shelfId, async () => {
        setShelves(previousShelves.filter((shelf) => shelf._id !== shelfId));
        await sendRequest({
          url: `/shelves/${shelfId}`,
          method: "delete",
          params: { withCredentials: true },
        });
        toast.success("Shelf removed successfully.");
      });
    } catch (error) {
      console.log(error);
      setShelves(previousShelves);
    }
  };
  const onCreateShelf = ({ name, description }) => {
    handleCreateShelf({ name, description });
  };
  useEffect(() => {
    fetchShelves();
    if (currentUser.role === "author") {
      console.log("FETCHING AUTHOR");
      fetchMyBooks();
      fetchCurrentAuthor();
    }
  }, [currentUser.role, fetchCurrentAuthor, fetchMyBooks, fetchShelves]);

  const updateAuthorField = async (fieldName, newValue) => {
    try {
      const body = fieldName.includes(".")
        ? {
            [fieldName.split(".")[0]]: {
              ...author[fieldName.split(".")[0]],
              [fieldName.split(".")[1]]: newValue,
            },
          }
        : { [fieldName]: newValue };

      await sendRequest({
        url: `/authors/me`,
        method: "put",
        body,
      });
      fetchCurrentAuthor();
      toast.success(`${fieldName.split(".").pop()} updated successfully.`);
    } catch (error) {
      console.error("Failed to update author field.", error);
      toast.error("Failed to update.");
    }
  };
  const updateAuthorBio = async (newBio) => {
    try {
      await sendRequest({
        url: `/authors/me`,
        method: "put",
        body: { bio: newBio },
      });
      fetchCurrentAuthor();
      toast.success("Bio updated successfully.");
    } catch (error) {
      console.error("Failed to update author bio.", error);
      toast.error("Failed to update bio.");
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="container">
      <Card p={"xl"} mb={"md"}>
        <Stack align="center">
          <Title order={2} fz={32} c={"copper.6"}>
            Your Profile
          </Title>
          <Group gap={0}>
            <Text fz={"lg"}> Welcome back, </Text>
            <EditableField
              fz={28}
              fw={"bold"}
              value={currentUser.name}
              onSave={(val) => updateField("name", val)}
            />
          </Group>
        </Stack>

        <Grid>
          <Grid.Col span={{ base: "12", md: "12" }}>
            <Text fw={"bold"} fz={28} c={"copper.5"} mt={32} mb={16}>
              Account Details
            </Text>

            <Group>
              <Text fw={"bold"} fz={"md"}>
                Name:{" "}
              </Text>
              <Text fz={"md"}>
                {currentUser.name}{" "}
                {currentUser.role === "author" &&
                  author &&
                  `(${author.penName})`}
              </Text>
            </Group>

            <Group>
              <Text fw={"bold"} fz={"md"}>
                Email:{" "}
              </Text>
              <Text fz={"md"}>{currentUser.email}</Text>
            </Group>
          </Grid.Col>

          {currentUser.role === "author" && (
            <Grid.Col span={{ base: "12", md: "6" }}>
              <Text fw={"bold"} fz={"md"}>
                Bio:
              </Text>
              <EditableField
                type="textarea"
                value={author.bio}
                onSave={updateAuthorBio}
              />
            </Grid.Col>
          )}

          {currentUser.role === "author" && author && (
            <Grid.Col span={{ base: "12", md: "6" }}>
              <Text fw={"bold"} fz={28} c={"copper.5"} mt={32} mb={16}>
                Social Presence
              </Text>
              <div style={rowStyle}>
                <span>
                  <strong>Website:</strong>
                </span>
                <EditableField
                  value={author.socialLinks?.website}
                  onSave={(v) => updateAuthorField("socialLinks.website", v)}
                />
              </div>
              <div style={rowStyle}>
                <span>
                  <strong>X (Twitter):</strong>
                </span>
                <EditableField
                  value={author.socialLinks?.x}
                  onSave={(v) => updateAuthorField("socialLinks.x", v)}
                />
              </div>
              <div style={rowStyle}>
                <span>
                  <strong>Instagram:</strong>
                </span>
                <EditableField
                  value={author.socialLinks?.instagram}
                  onSave={(v) => updateAuthorField("socialLinks.instagram", v)}
                />
              </div>
              <div style={rowStyle}>
                <span>
                  <strong>LinkedIn:</strong>
                </span>
                <EditableField
                  value={author.socialLinks?.linkedIn}
                  onSave={(v) => updateAuthorField("socialLinks.linkedIn", v)}
                />
              </div>
            </Grid.Col>
          )}
        </Grid>
      </Card>

      <Grid>
        <Grid.Col>
          <Card>
            <Text fw={"bold"} fz={28} c={"copper.5"} mt={32} mb={16}>
              Shelves
            </Text>
            <Text fz={"lg"} mb={"md"}>
              Create new shelves to organize your reading list.
            </Text>
            {shelves?.length === 0 && (
              <p>You haven't created any shelves yet.</p>
            )}
            <ul style={{ listStyle: "none", padding: 0 }}>
              <Button
                className="contrast"
                onClick={() => setIsNewShelfModalOpen(true)}
              >
                New Shelf +
              </Button>
              {shelves.map((shelf) => (
                <Shelf
                  key={shelf._id}
                  style={{ marginBottom: "1rem" }}
                  shelf={shelf}
                  handleRemoveShelf={handleRemoveShelf}
                  isRemoving={shelfRemovingId === shelf._id}
                  isCollapsing={shelfCollapsingId === shelf._id}
                />
              ))}
            </ul>
          </Card>
        </Grid.Col>
        <Grid.Col>
          {currentUser.role === "author" && (
            <Card>
              <Title fw={"bold"} fz={28} c={"copper.5"} mt={32} mb={16}>
                Published Books
              </Title>
              {!myBooks.length ? (
                <Text fz={"lg"} mb={"md"}>
                  No books published yet.
                </Text>
              ) : (
                <SimpleGrid cols={{ base: 2, sm: 2, md: 3 }} spacing="lg">
                  {books.map((book) => (
                    <PublishedBookCard book={book} key={book._id} />
                  ))}
                </SimpleGrid>
              )}
            </Card>
          )}
        </Grid.Col>
      </Grid>

      {isNewShelfModalOpen && (
        <NewShelfModal
          onClose={() => setIsNewShelfModalOpen(false)}
          onCreate={onCreateShelf}
        />
      )}
    </main>
  );
}
