import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { sendRequest } from "../utils/sendRequest";
import { useBooksStore } from "../stores/booksStore";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuthStore();
  const clearStore = useBooksStore((s) => s.clearStore);

  const onLogoutClick = async () => {
    await sendRequest("/auth/logout", "post");
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
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books/new"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                New Book
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
