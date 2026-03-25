import { Burger, Button, Container, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { sendRequest } from "../../utils/sendRequest";
import { useBooksStore } from "../../stores/booksStore";
import "./Navbar.css";

const getNavLinkClassName = ({ isActive }) =>
  `app-navbar__link${isActive ? " app-navbar__link--active" : ""}`;

export default function Navbar() {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);
  const { isLoggedIn, logout, currentUser } = useAuthStore();
  const clearStore = useBooksStore((s) => s.clearStore);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpened(false);
  }, [location.pathname]);

  const onLogoutClick = async () => {
    await sendRequest({ url: "/auth/logout", method: "post" });
    logout();
    clearStore();
  };

  return (
    <header className="app-navbar">
      <Container size="lg" className="app-navbar__inner">
        <div className="app-navbar__layout">
          <Link to="/books" className="app-navbar__brand-link">
            <Text className="app-navbar__brand">BookVerse</Text>
          </Link>

          <Burger
            opened={mobileMenuOpened}
            onClick={() => setMobileMenuOpened((opened) => !opened)}
            hiddenFrom="md"
            size="md"
            color="var(--mantine-color-ink-8)"
            aria-label={
              mobileMenuOpened
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="app-navbar__burger"
          />

          <div
            className={`app-navbar__actions${
              mobileMenuOpened ? " app-navbar__actions--open" : ""
            }`}
          >
            <NavLink to="/books" className={getNavLinkClassName}>
              Books
            </NavLink>

            <div className="app-navbar__primary-actions">
              {isLoggedIn &&
                (!(currentUser.role === "author") ? (
                  <Button
                    component={Link}
                    to="/author/onboarding"
                    color="copper"
                  >
                    Become an Author
                  </Button>
                ) : (
                  <>
                    <NavLink to="/books/new" className={getNavLinkClassName}>
                      Write a Book
                    </NavLink>
                    <NavLink
                      to="/author/my-books"
                      className={getNavLinkClassName}
                    >
                      Manage My Books
                    </NavLink>
                  </>
                ))}
            </div>

            <div className="app-navbar__auth-actions">
              {isLoggedIn ? (
                <>
                  <NavLink to="/profile" className={getNavLinkClassName}>
                    Profile
                  </NavLink>
                  <Button
                    component={Link}
                    to="/login"
                    onClick={onLogoutClick}
                    variant="subtle"
                    color="copper"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/signup" end className={getNavLinkClassName}>
                    Signup
                  </NavLink>
                  <Button component={Link} to="/login" color="copper">
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
