import { NavLink } from "react-router-dom";

export default function Navbar() {
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
      </ul>
    </nav>
  );
}
