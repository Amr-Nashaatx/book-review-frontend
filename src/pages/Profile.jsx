import { useEffect, useState } from "react";
import { useFetchShelves } from "../hooks/useFetchShelves";
import { useAuthStore } from "../stores/authStore";
import NewShelfModal from "../components/NewShelfModal";

import { Link, Navigate } from "react-router-dom";

export default function Profile() {
  const { fetchShelves, shelves } = useFetchShelves();
  const [isNewShelfModalOpen, setIsNewShelfModalOpen] = useState(false);
  const { currentUser, isLoggedIn } = useAuthStore();

  useEffect(() => {
    fetchShelves();
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
            onCreate={(shelf) => {
              console.log(shelf);
            }}
          />
        )}
        {shelves && (
          <ul
            className="shelf-list"
            style={{ listStyle: "none", marginTop: "2rem" }}
          >
            {shelves.map((shelf) => (
              <li key={shelf._id} className="shelf-card">
                <div>
                  <strong>{shelf.name} </strong>
                  <small>({shelf.booksCount})</small>
                </div>
                <Link to={`/shelves/${shelf._id}`} className="shelf-link">
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
