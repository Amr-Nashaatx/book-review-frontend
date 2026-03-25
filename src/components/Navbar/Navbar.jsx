import { Button, Container, Group, Text } from "@mantine/core";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { sendRequest } from "../../utils/sendRequest";
import { useBooksStore } from "../../stores/booksStore";
import "./Navbar.css";

const getNavLinkClassName = ({ isActive }) =>
  `app-navbar__link${isActive ? " app-navbar__link--active" : ""}`;

export default function Navbar() {
  const { isLoggedIn, logout, currentUser } = useAuthStore();
  const clearStore = useBooksStore((s) => s.clearStore);

  const onLogoutClick = async () => {
    await sendRequest({ url: "/auth/logout", method: "post" });
    logout();
    clearStore();
  };

  return (
    <header className="app-navbar">
      <Container size="lg" className="app-navbar__inner">
        <Group
          justify="space-between"
          gap="md"
          wrap="nowrap"
          style={{ width: "100%" }}
        >
          <Link to="/books" className="app-navbar__brand-link">
            <Text className="app-navbar__brand">BookVerse</Text>
          </Link>

          <Group
            gap="xs"
            wrap="wrap"
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <NavLink to="/books" className={getNavLinkClassName}>
              Books
            </NavLink>
            <Group justify="space-between">
              <div>
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

              <div className="nav-auth-actions">
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
            </Group>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
