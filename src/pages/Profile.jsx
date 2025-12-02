import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/user/me`, {
          withCredentials: true,
        });
        const userData = data.data.user;
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>Unable to load user data.</p>;
  }

  return (
    <article className="main-content">
      <header style={{ textAlign: "center" }}>
        <h2>Your Profile</h2>
        <p>Welcome back, {user.name}!</p>
      </header>
      <section>
        <dl>
          <dt>Name</dt>
          <dd>{user.name}</dd>

          <dt>Email</dt>
          <dd>{user.email}</dd>
        </dl>
      </section>
      <hr />
      <section className="shelves">
        <h2>Shelves</h2>
        <ul>
          {["favorite", "reading", "to-read"].map((shelf) => (
            <li key={shelf}>{shelf}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
