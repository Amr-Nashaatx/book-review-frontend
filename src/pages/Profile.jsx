import { useEffect, useState } from "react";
import { useFetchShelves } from "../hooks/useFetchShelves";
import { useListAnimation } from "../hooks/useListAnimation";
import { useAuthStore } from "../stores/authStore";
import NewShelfModal from "../components/NewShelfModal";
import { sendRequest } from "../utils/sendRequest";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import Shelf from "../components/Shelf/Shelf";
import BookCard from "../components/BookCard/BookCard";

import { useFetchMyBooks } from "../hooks/useFetchMyBooks";
import { useFetchCurrentAuthor } from "../hooks/useFetchCurrentAuthor.js";
import EditableField from "../components/EditableField";

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  minHeight: "40px",
};

export default function Profile() {
  const [isNewShelfModalOpen, setIsNewShelfModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { fetchShelves, shelves, setShelves } = useFetchShelves();
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
      setToastMessage("Shelf created successfully.");
      setIsNewShelfModalOpen(false);
      navigate(`/shelves/${shelf._id}`);
    } catch (error) {
      console.error("Failed to create shelf.", error);
      setToastMessage("Failed to create shelf.");
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
      setToastMessage(`${fieldName} updated successfully.`);
    } catch (error) {
      console.error("Failed to update user field.", error);
      setToastMessage("Failed to update.");
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
        setToastMessage("Shelf removed successfully.");
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
    fetchMyBooks();
    if (currentUser.role === "author") {
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
      setToastMessage(`${fieldName.split(".").pop()} updated successfully.`);
    } catch (error) {
      console.error("Failed to update author field.", error);
      setToastMessage("Failed to update.");
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
      setToastMessage("Bio updated successfully.");
    } catch (error) {
      console.error("Failed to update author bio.", error);
      setToastMessage("Failed to update bio.");
    }
  };
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="container">
      <hgroup style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1>Your Profile</h1>
        Welcome back,
        <EditableField
          value={currentUser.name}
          onSave={(val) => updateField("name", val)}
        />
        !
      </hgroup>

      <div className="grid">
        <article>
          <header>
            <strong>Account Details</strong>
          </header>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              <strong>Name:</strong>
            </span>
            <span>
              {currentUser.name}{" "}
              {currentUser.role === "author" && author && `(${author.penName})`}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <strong>Email:</strong>
            </span>
            <span>{currentUser.email}</span>
          </div>
          {currentUser.role === "author" && (
            <footer>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <strong>Bio:</strong>
                <EditableField
                  type="textarea"
                  value={author.bio}
                  onSave={updateAuthorBio}
                />
              </div>
            </footer>
          )}
        </article>
        {currentUser.role === "author" && author && (
          <article>
            <header>
              <strong>Social Presence</strong>
            </header>
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
          </article>
        )}
      </div>

      <hr />

      <div className="grid">
        <section>
          <h2>Shelves</h2>
          <p>Create new shelves to organize your reading list.</p>
          <button
            className="contrast"
            style={{ marginBottom: "2rem" }}
            onClick={() => setIsNewShelfModalOpen(true)}
          >
            New Shelf +
          </button>
          {shelves?.length === 0 && <p>You haven't created any shelves yet.</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
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
        </section>

        {currentUser.role === "author" && (
          <section>
            <h2>Published Books</h2>
            {!myBooks.length ? (
              <p className="secondary">No books published yet.</p>
            ) : (
              <div style={{ display: "grid", gap: "1rem" }}>
                {myBooks.map((book) => (
                  <BookCard book={book} key={book._id} />
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {isNewShelfModalOpen && (
        <NewShelfModal
          onClose={() => setIsNewShelfModalOpen(false)}
          onCreate={onCreateShelf}
        />
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </main>
  );
}
