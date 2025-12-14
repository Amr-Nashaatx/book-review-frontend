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

export default function Profile() {
  const { fetchShelves, shelves, setShelves } = useFetchShelves();
  const { fetchMyBooks, myBooks } = useFetchMyBooks();
  const [isNewShelfModalOpen, setIsNewShelfModalOpen] = useState(false);
  const {
    removingId: shelfRemovingId,
    collapsingId: shelfCollapsingId,
    handleRemove: animateRemoveShelf,
  } = useListAnimation();

  const { currentUser, isLoggedIn } = useAuthStore();
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

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
      console.log(error);
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
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <article className="main-content">
      <header style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Your Profile</h2>
        <p>Welcome back, {currentUser.name}!</p>
      </header>
      <section className="profile-card">
        <dl>
          <div className="row">
            <dt>Name: </dt>
            <dd>{currentUser.name}</dd>
          </div>

          <div className="row">
            <dt>Email: </dt>
            <dd>{currentUser.email}</dd>
          </div>
        </dl>
      </section>
      <hr />
      <section className="shelves">
        <h2>Shelves</h2>
        <button onClick={() => setIsNewShelfModalOpen(true)}>
          New Shelf +
        </button>
        {isNewShelfModalOpen && (
          <NewShelfModal
            onClose={() => setIsNewShelfModalOpen(false)}
            onCreate={onCreateShelf}
          />
        )}
        {shelves && (
          <ul
            className="shelf-list"
            style={{ listStyle: "none", marginTop: "2rem" }}
          >
            {shelves.map((shelf) => (
              <Shelf
                key={shelf._id}
                shelf={shelf}
                handleRemoveShelf={handleRemoveShelf}
                isRemoving={shelfRemovingId === shelf._id}
                isCollapsing={shelfCollapsingId === shelf._id}
              />
            ))}
          </ul>
        )}
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage("")} />
        )}
      </section>
      <section className="mybooks">
        <h2>My Books</h2>
        {!myBooks.length && <p>You have not published any book yet.</p>}
        {myBooks.map((book) => (
          <BookCard book={book} key={book._id} bookData={book} />
        ))}
      </section>
    </article>
  );
}
