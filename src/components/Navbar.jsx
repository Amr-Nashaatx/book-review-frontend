import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { sendRequest } from "../utils/sendRequest";
import { useBooksStore } from "../stores/booksStore";

export default function Navbar() {
  const { isLoggedIn, logout, currentUser } = useAuthStore();
  const clearStore = useBooksStore((s) => s.clearStore);
  const onLogoutClick = async () => {
    await sendRequest({ url: "/auth/logout", method: "post" });
    logout();
    clearStore();
  };
  return (
    <nav>
      <ul>
        <li>
          <strong>BookVerse</strong>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink
            to="/books"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Books
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            {!(currentUser.role === "author") ? (
              <li>
                <Link to="/author/onboarding">
                  <button>Become an Author</button>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/books/new"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Write a Book
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/author/my-books"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Manage My Books
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <Link to="/login" onClick={onLogoutClick}>
                Logout
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/signup"
                end
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Signup
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
