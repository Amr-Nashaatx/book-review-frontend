import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const onLogoutClick = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`);
      setIsLoggedIn(false);
    } catch (error) {
      return;
    }
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
